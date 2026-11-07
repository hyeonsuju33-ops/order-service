
    begin
      # API can provide a URL
      if file.nil? && url.present? && is_api?
        tempfile = FileHelper.download(url, 10.megabytes, "discourse-upload-#{type}") rescue nil
        filename = File.basename(URI.parse(url).path)
      else
        tempfile = file.tempfile

        content_type = file.content_type
      end

      # allow users to upload large images that will be automatically reduced to allowed size
      if tempfile && tempfile.size > 0 && SiteSetting.max_image_size_kb > 0 && FileHelper.is_image?(filename)
        attempt = 5
        while attempt > 0 && tempfile.size > SiteSetting.max_image_size_kb.kilobytes
          OptimizedImage.downsize(tempfile.path, tempfile.path, "80%", allow_animation: SiteSetting.allow_animated_thumbnails)
          attempt -= 1
        end
      end

      upload = Upload.create_for(current_user.id, tempfile, filename, tempfile.size, content_type: content_type, image_type: type)

      if upload.errors.empty? && current_user.admin?

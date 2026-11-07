
    begin
      # API can provide a URL
      if file.nil? && url.present? && is_api?
        tempfile = FileHelper.download(url, SiteSetting.max_image_size_kb.kilobytes, "discourse-upload-#{type}") rescue nil
        filename = File.basename(URI.parse(url).path)
      else
        tempfile = file.tempfile

        content_type = file.content_type
      end

      upload = Upload.create_for(current_user.id, tempfile, filename, tempfile.size, content_type: content_type, image_type: type)

      if upload.errors.empty? && current_user.admin?

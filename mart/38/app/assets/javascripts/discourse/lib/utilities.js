

    // check file size
    var fileSizeKB = file.size / 1024;
    var maxSizeKB = Discourse.SiteSettings['max_' + type + '_size_kb'];
    if (fileSizeKB > maxSizeKB) {
      bootbox.alert(I18n.t('post.errors.file_too_large', { max_size_kb: maxSizeKB }));
      return false;


        // entity too large, usually returned from the web server
        case 413:
          var maxSizeKB = Discourse.SiteSettings.max_image_size_kb;
          bootbox.alert(I18n.t('post.errors.file_too_large', { max_size_kb: maxSizeKB }));
          return;


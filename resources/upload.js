import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dnnwlqjk8', 
  api_key: '585897676195882', 
  api_secret: '75iz7SMjCFGC8OW491RrUDwcSAU' 
});

cloudinary.uploader.upload('./server-be/resources/img/default.png', function(error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log(result.url); // URL gambar yang diunggah
    }
  });
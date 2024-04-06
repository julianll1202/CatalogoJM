"use strict";


var avatar4 = new KTImageInput('kt_image_4');

avatar4.on('cancel', function(imageInput) {
 swal.fire({
  title: 'Image successfully canceled !',
  type: 'success',
  buttonsStyling: false,
  confirmButtonText: 'Awesome!',
  confirmButtonClass: 'btn btn-primary font-weight-bold'
 });
});

avatar4.on('change', function(imageInput) {
 swal.fire({
  title: 'Image successfully changed !',
  type: 'success',
  buttonsStyling: false,
  confirmButtonText: 'Awesome!',
  confirmButtonClass: 'btn btn-primary font-weight-bold'
 });
});

avatar4.on('remove', function(imageInput) {
 swal.fire({
  title: 'Image successfully removed !',
  type: 'error',
  buttonsStyling: false,
  confirmButtonText: 'Got it!',
  confirmButtonClass: 'btn btn-primary font-weight-bold'
 });
});


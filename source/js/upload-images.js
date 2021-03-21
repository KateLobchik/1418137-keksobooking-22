const IMAGES_TYPES = ['jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');

const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const previewUploadImage = (fileChooser, preview, altImage) => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = IMAGES_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (!preview.hasChildNodes()) {
      const newFile = document.createElement('img');
      newFile.style.width = '100%';
      newFile.style.height = '100%';
      newFile.alt = altImage;
      preview.append(newFile);
    }

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.children[0].src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetImageForm = () => {
  photoPreview.innerHTML = '';
}



previewUploadImage(avatarChooser, avatarPreview);
previewUploadImage(photoChooser, photoPreview, 'Фотография жилья');

export { resetImageForm };

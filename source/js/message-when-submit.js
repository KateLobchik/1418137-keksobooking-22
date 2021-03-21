import { resetFormField } from './form.js';

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const messageOnSuccess = () => {
  const popupSuccessTemplate = document.querySelector('#success').content.cloneNode(true);
  const popupSuccess = document.createElement('div');
  popupSuccess.appendChild(popupSuccessTemplate);
  const mainBlock = document.querySelector('main');
  mainBlock.appendChild(popupSuccess);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopupSuccess();
    }
  };

  const closePopupSuccess = () => {
    resetFormField();
    popupSuccess.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
  };


  document.addEventListener('keydown', onPopupEscKeydown);

  popupSuccess.addEventListener('click', () => {
    closePopupSuccess();
  });
}

const messageOnFail = () => {
  const popupErrorTemplate = document.querySelector('#error').content.cloneNode(true);
  const popupError = document.createElement('div');
  popupError.appendChild(popupErrorTemplate);
  const mainBlock = document.querySelector('main');
  mainBlock.appendChild(popupError);

  const buttonError = document.querySelector('.error__button');

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closePopupError();
    }
  };

  const closePopupError = () => {
    popupError.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  buttonError.addEventListener('click', () => {
    closePopupError();
  });

  document.addEventListener('keydown', onPopupEscKeydown);

  popupError.addEventListener('click', () => {
    closePopupError();
  });
}


export { messageOnSuccess, messageOnFail };

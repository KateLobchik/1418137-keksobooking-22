import { returnFormField } from './form.js';

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const messageOnSuccess = () => {
  const popapSuccessTemplate = document.querySelector('#success').content.cloneNode(true);
  const popapSuccess = document.createElement('div');
  popapSuccess.appendChild(popapSuccessTemplate);
  const mainBlock = document.querySelector('main');
  mainBlock.appendChild(popapSuccess);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      returnFormField();
      popapSuccess.classList.add('hidden');
    }
  });

  popapSuccess.addEventListener('click', () => {
    returnFormField();
    popapSuccess.classList.add('hidden');
  });
}

const messageOnFail = () => {
  const popapErrorTemplate = document.querySelector('#error').content.cloneNode(true);
  const popapError = document.createElement('div');
  popapError.appendChild(popapErrorTemplate);
  const mainBlock = document.querySelector('main');
  mainBlock.appendChild(popapError);

  const buttonError = document.querySelector('.error__button');

  buttonError.addEventListener('click', () => {
    popapError.classList.add('hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      popapError.classList.add('hidden');
    }
  });

  popapError.addEventListener('click', () => {
    popapError.classList.add('hidden');
  });
}


export { messageOnSuccess, messageOnFail };

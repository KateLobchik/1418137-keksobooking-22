import { mainMarker } from './map.js';
import { resetFilter } from './filter.js';
import { resetImageForm } from './upload-images.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const minPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const MAX_PRICE = 1000000;

const NO_GUESTS = 0;
const MAX_NUMBER_ROOMS = 100;


const adForm = document.querySelector('.ad-form');


//Валидация полей (заголовок, тип жилья и цена, время)

const inputTypeHouse = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const inputTitle = adForm.querySelector('#title');
const formTime = adForm.querySelector('.ad-form__element--time');
const inputsTime = formTime.querySelectorAll('select');

inputTitle.addEventListener('input', () => {
  inputTitle.min = MIN_TITLE_LENGTH;
  inputTitle.max = MAX_TITLE_LENGTH;

  const valueLength = inputTitle.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
})


inputTypeHouse.addEventListener('change', () => {
  inputPrice.placeholder = minPrice[inputTypeHouse.value];
  inputPrice.min = minPrice[inputTypeHouse.value];
  inputPrice.max = MAX_PRICE;
});

inputPrice.addEventListener('input', () => {
  inputPrice.placeholder = minPrice[inputTypeHouse.value];
  inputPrice.min = minPrice[inputTypeHouse.value];
  inputPrice.max = MAX_PRICE;
});

inputsTime[0].addEventListener('click', () => {
  inputsTime[1].value = inputsTime[0].value;
});

inputsTime[1].addEventListener('click', () => {
  inputsTime[0].value = inputsTime[1].value;
});



//Валидация количество комнат и гостей

const inputRoomNumber = adForm.querySelector('#room_number');
const inputCapacity = adForm.querySelector('#capacity');

inputRoomNumber.addEventListener('click', () => {
  const room = +(inputRoomNumber.value);
  const guest = +(inputCapacity.value);

  if (room >= MAX_NUMBER_ROOMS && guest > NO_GUESTS) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  } else if (room < MAX_NUMBER_ROOMS && guest === NO_GUESTS) {
    inputCapacity.setCustomValidity('Выберите количество гостей');
  } else if (room < guest && guest < MAX_NUMBER_ROOMS) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  } else {
    inputCapacity.setCustomValidity('');
  }
});

inputCapacity.addEventListener('click', () => {
  const room = +(inputRoomNumber.value);
  const guest = +(inputCapacity.value);

  if (room < MAX_NUMBER_ROOMS && guest > NO_GUESTS && room >= guest) {
    inputCapacity.setCustomValidity('');
  } else if (room >= MAX_NUMBER_ROOMS && guest === NO_GUESTS) {
    inputCapacity.setCustomValidity('');
  }

  if (room >= MAX_NUMBER_ROOMS && guest > NO_GUESTS) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  } else if (room < MAX_NUMBER_ROOMS && guest === NO_GUESTS) {
    inputCapacity.setCustomValidity('Выберите количество гостей или комнат');
  } else if (room < guest && guest < MAX_NUMBER_ROOMS) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  }

});



//Зависимость значения поля с адресом и метки

const buttonReset = document.querySelector('.ad-form__reset');
const adFormAdress = adForm.querySelector('#address');
adFormAdress.setAttribute('readonly', 'readonly');

const startAdress = mainMarker.getLatLng();
const startAdressField = `${startAdress.lat.toFixed(5)}, ${startAdress.lng.toFixed(5)}`;
adFormAdress.value = startAdressField;

mainMarker.on('drag', (evt) => {
  adFormAdress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

const resetFormField = () => {
  adForm.reset();
  resetFilter();
  adFormAdress.value = startAdressField;
  mainMarker.setLatLng(startAdress);
  resetImageForm();
};

buttonReset.addEventListener('click', evt => {
  evt.preventDefault();
  resetFormField();
});


export { adForm, resetFormField };

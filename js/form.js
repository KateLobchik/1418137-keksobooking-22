import { mainMarker } from './map.js';

const adForm = document.querySelector('.ad-form');

//Валидация полей (заголовок, тип жилья и цена, время)
const inputTypeHouse = adForm.querySelector('#type');
const inputPrice = adForm.querySelector('#price');
const inputTitle = adForm.querySelector('#title');
const formTime = adForm.querySelector('.ad-form__element--time');
const inputsTime = formTime.querySelectorAll('select');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

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


const priceTypeHouse = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

inputTypeHouse.addEventListener('change', () => {
  inputPrice.placeholder = priceTypeHouse[inputTypeHouse.value];
  inputPrice.min = priceTypeHouse[inputTypeHouse.value];
  inputPrice.max = 1000000;
});

inputPrice.addEventListener('input', () => {
  inputPrice.placeholder = priceTypeHouse[inputTypeHouse.value];
  inputPrice.min = priceTypeHouse[inputTypeHouse.value];
  inputPrice.max = 1000000;
});

for (let i = 0; i < inputsTime.length; i++) {
  inputsTime[i].addEventListener('click', () => {
    inputsTime.forEach((section) => {
      section.value = inputsTime[i].value;
    })
  });
}


//Валидация количество комнат и гостей

const inputRoomNumber = adForm.querySelector('#room_number');
const inputCapacity = adForm.querySelector('#capacity');

/*Можно при выборе количества комнат добавить блокировку недопустимых вариантов выбора количества гостей*/

// const inputRoomNumberFields = inputRoomNumber.querySelectorAll('option');
// const inputCapacityFields = inputCapacity.querySelectorAll('option');

// inputRoomNumber.addEventListener('click', () => {
//   for (let i = 0; i < inputCapacityFields.length; i++) {
//     inputCapacityFields[i].setAttribute('disabled', 'disabled');
//   }
//   if (inputRoomNumber.value < 100) {
//     for (let i = inputCapacityFields.length - 2; i >= (inputCapacityFields.length - 1) - inputRoomNumber.value; i--) {
//       inputCapacityFields[i].removeAttribute('disabled');
//     }
//   }
//   if (inputRoomNumber.value >= 100) {
//     inputCapacityFields[inputCapacityFields.length - 1].removeAttribute('disabled');
//   }
// });

// inputCapacity.addEventListener('click', () => {
//   for (let i = 0; i < inputCapacityFields.length; i++) {
//     inputCapacityFields[i].setAttribute('disabled', 'disabled');
//   }
//   if (inputRoomNumber.value < 100) {
//     for (let i = inputCapacityFields.length - 2; i >= (inputCapacityFields.length - 1) - inputRoomNumber.value; i--) {
//       inputCapacityFields[i].removeAttribute('disabled');
//     }
//   }
//   if (inputRoomNumber.value >= 100) {
//     inputCapacityFields[inputCapacityFields.length - 1].removeAttribute('disabled');
//   }
// });

inputRoomNumber.addEventListener('click', () => {
  const room = inputRoomNumber.value;
  const guest = inputCapacity.value

  if (room >= 100 && guest > 0) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  } else if (room < 100 && guest == 0) {
    inputCapacity.setCustomValidity('Выберите количество гостей');
  } else if (room < guest && guest < 100) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  } else {
    inputCapacity.setCustomValidity('');
  }
});

inputCapacity.addEventListener('click', () => {
  const room = inputRoomNumber.value;
  const guest = inputCapacity.value

  if (room < 100 && guest > 0 && room >= guest) {
    inputCapacity.setCustomValidity('');
  } else if (room >= 100 && guest == 0) {
    inputCapacity.setCustomValidity('');
  }

  if (room >= 100 && guest > 0) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  } else if (room < 100 && guest == 0) {
    inputCapacity.setCustomValidity('Выберите количество гостей или комнат');
  } else if (room < guest && guest < 100) {
    inputCapacity.setCustomValidity('Измените количество гостей или комнат');
  }

});



//Зависимость значения поля с адресом и метки

const buttonReset = document.querySelector('.ad-form__reset');
const adFormAdress = adForm.querySelector('#address');
adFormAdress.setAttribute('readonly', 'readonly');

const startAdress = mainMarker.getLatLng();
const startAdressField = startAdress.lat.toFixed(5) + ', ' + startAdress.lng.toFixed(5);
adFormAdress.value = startAdressField;

mainMarker.on('moveend', (evt) => {
  adFormAdress.value = evt.target.getLatLng().lat.toFixed(5) + ', ' + evt.target.getLatLng().lng.toFixed(5);
});

const returnFormField = () => {
  adForm.reset();
  adFormAdress.value = startAdressField;
  mainMarker.setLatLng(startAdress);
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  returnFormField();
});


export { adForm, returnFormField };

const getRandomNumber = (a = 0, b = 0, lengthRemainder = 0) => {
  const remainder = Math.pow(10, lengthRemainder);
  const min = Math.min(a, b) * remainder;
  const max = Math.max(a, b) * remainder;
  if (min < 0) {
    return NaN;
  }

  return +(((Math.floor(Math.random() * (max - min + 1)) + min) / remainder).toFixed(lengthRemainder));
};

const getRandomElemets = (array, min = 1) => {
  const randomLength = getRandomNumber(min, array.length);
  const newArray = [...array].sort(() => Math.random() - 0.5);
  return newArray.slice(0, randomLength);
};

const showAlert = (placeClass, widthAlert, message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.width = widthAlert;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'lightblue';

  alertContainer.textContent = message;

  document.querySelector(placeClass).append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};


export { getRandomNumber, getRandomElemets, showAlert };

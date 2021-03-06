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


const transformHtmlToNode = (element) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = element;
  return wrapper.firstChild;
};

const showAlert = (placeClass, widthAlert, message) => {
  const alertMessage = `<div style = "z-index: 400; position: absolute; width: ${widthAlert};
  padding: 10px 3px; font-size: 30px; text-align: center;
  background-color: lightblue;">${message}</div>`;

  const nodeAlertMessage = transformHtmlToNode(alertMessage);
  document.querySelector(placeClass).append(nodeAlertMessage);

  setTimeout(() => {
    nodeAlertMessage.remove();
  }, 5000);
};

export { getRandomNumber, getRandomElemets, showAlert };

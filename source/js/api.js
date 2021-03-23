import { adForm } from './form.js';
import { showMessageOnSuccess, showMessageOnFail } from './message-when-submit.js';
import { renderSimilarAd, disableFormFields } from './map.js';
import { filterForm } from './filter.js';
import { showAlert } from './util.js';
import { filterAds } from './filter.js';


const API_URL_FOR_GET_DATA = 'https://22.javascript.pages.academy/keksobooking/data';
const API_URL_FOR_FORM_SUBMIT = 'https://22.javascript.pages.academy/keksobooking';


const getData = onSuccess => {
  fetch(API_URL_FOR_GET_DATA)
    .then(response => response.json())
    .then(ads => {
      onSuccess(ads);
    })
    .catch(() => {
      showAlert('.map__canvas', '100%', 'К сожалению, сервер не отвечает. Обновите страницу.');
      disableFormFields(filterForm, 'map__filters--disabled');
    });
}


const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      API_URL_FOR_FORM_SUBMIT,
      {
        method: 'POST',
        body: formData,
      },
    ).then(responseData => {
      responseData.ok ? onSuccess(adForm) : onFail();
    })
      .catch(() => {
        onFail();
      });
  });
}


getData(ads => {
  filterAds(ads, renderSimilarAd);
});

setUserFormSubmit(showMessageOnSuccess, showMessageOnFail);

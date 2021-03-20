import { adForm } from './form.js';
import { messageOnSuccess, messageOnFail } from './message-when-submit.js';
import { renderSimilarAd, disableFormFields, mapFilter } from './map.js';
import { showAlert } from './util.js';
import { filterAds } from './filter.js';


const getData = onSuccess => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(response => response.json())
    .then(ads => {
      onSuccess(ads);
    })
    .catch(() => {
      showAlert('.map__canvas', '100%', 'К сожалению, сервер не отвечает. Обновите страницу.');
      disableFormFields(mapFilter, 'map__filters--disabled');
    });
}


const setUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://22.javascript.pages.academy/keksobooking',
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

setUserFormSubmit(messageOnSuccess, messageOnFail);

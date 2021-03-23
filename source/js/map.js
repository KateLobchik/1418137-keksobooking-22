/* global L:readonly */

import { createSimilarAd } from './create-similar-ad.js';
import { filterForm } from './filter.js';



const disableFormFields = (form, disabledClass) => {
  form.classList.add(disabledClass);

  // Не использовала forEach, т.к. этот метод не работает на коллекциях HTML (.children)
  for (let child of form.children) {
    child.setAttribute('disabled', 'disabled');
  }
};

const activateFormFields = (form, disabledClass) => {
  form.classList.remove(disabledClass);
  for (let child of form.children) {
    child.removeAttribute('disabled');
  }
};


const adForm = document.querySelector('.ad-form');
const mapFilter = filterForm;

const mapCenterCoordinates = { lat: 35.6895, lng: 139.69171 };
const startCoordinatesMainMarker = mapCenterCoordinates;

const optionsMainMarker = {
  size: [40, 40],
  anchor: [20, 40],
  shadowSize: [35, 35],
  shadowAnchor: [10, 35],
};
const markerOptions = {
  size: [30, 30],
  anchor: [15, 30],
  shadowSize: [30, 30],
  shadowAnchor: [8, 30],
};



disableFormFields(adForm, 'ad-form--disabled');
disableFormFields(mapFilter, 'map__filters--disabled');


const map = L.map('map-canvas')
  .on('load', () => {
    activateFormFields(adForm, 'ad-form--disabled');
    activateFormFields(mapFilter, 'map__filters--disabled');
  })
  .setView(mapCenterCoordinates, 10);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: optionsMainMarker.size,
  iconAnchor: optionsMainMarker.anchor,
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: optionsMainMarker.shadowSize,
  shadowAnchor: optionsMainMarker.shadowAnchor,
});

const mainMarker = L.marker(
  startCoordinatesMainMarker,
  {
    draggable: true,
    icon: mainIcon,
  },
);
mainMarker.addTo(map);


const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: markerOptions.size,
  iconAnchor: markerOptions.anchor,
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: markerOptions.shadowSize,
  shadowAnchor: markerOptions.shadowAnchor,
});


const allMarkers = [];

const clearAllMarkers = () => {
  allMarkers.forEach(marker => {
    marker.remove();
  })
  allMarkers.length = 0;
}

const renderSimilarAd = (similarAds) => {
  clearAllMarkers();

  similarAds.forEach(ad => {
    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon: icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createSimilarAd(ad),
        {
          keepInView: true,
        },
      );

    allMarkers.push(marker);
  });
};


export { renderSimilarAd, disableFormFields, mainMarker };

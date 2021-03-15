/* global L:readonly */

import { createSimilarAd } from './create-similar-ad.js';

const disableFormFields = (form, disabledClass) => {
  form.classList.add(disabledClass);
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].setAttribute('disabled', 'disabled');
  }
}

const activateFormFields = (form, disabledClass) => {
  form.classList.remove(disabledClass);
  for (let i = 0; i < form.children.length; i++) {
    form.children[i].removeAttribute('disabled');
  }
}

const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

disableFormFields(adForm, 'ad-form--disabled');
disableFormFields(mapFilter, 'map__filters--disabled');


const map = L.map('map-canvas')
  .on('load', () => {
    activateFormFields(adForm, 'ad-form--disabled');
    activateFormFields(mapFilter, 'map__filters--disabled');
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 12);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: [35, 35],
  shadowAnchor: [10, 35],
});

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainMarker.addTo(map);


const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: [30, 30],
  shadowAnchor: [8, 30],
});

const renderSimilarAd = (similarAds) => {
  similarAds.forEach(ad => {
    const marker = L.marker(
      {
        lat: ad.location.lat,
        lng: ad.location.lng,
      },
      {
        icon: pinIcon,
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
  });
};

export { renderSimilarAd, disableFormFields, mapFilter, mainMarker };

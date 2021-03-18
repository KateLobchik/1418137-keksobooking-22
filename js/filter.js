const filterForm = document.querySelector('.map__filters');
const typeHouse = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
const numberRooms = filterForm.querySelector('#housing-rooms');
const numberGuests = filterForm.querySelector('#housing-guests');

const featuresFieldset = filterForm.querySelector('#housing-features');
const filterWiFi = featuresFieldset.querySelector('#filter-wifi');
const filterDishwasher = featuresFieldset.querySelector('#filter-dishwasher');
const filterParking = featuresFieldset.querySelector('#filter-parking');
const filterWasher = featuresFieldset.querySelector('#filter-washer');
const filterElevator = featuresFieldset.querySelector('#filter-elevator');
const filterConditioner = featuresFieldset.querySelector('#filter-conditioner');

const allAds = [];
let render = () => null;


const filters = {
  typeHouse: () => true,
  price: () => true,
  numberRooms: () => true,
  numberGuests: () => true,
  featureWiFi: () => true,
  featureDishwasher: () => true,
  featureParking: () => true,
  featureWasher: () => true,
  featureElevator: () => true,
  featureConditioner: () => true,
};

const doFilter = () => {
  const filteredAds = allAds.filter(oneAd => {

    return filters.typeHouse(oneAd)
      && filters.price(oneAd)
      && filters.numberRooms(oneAd)
      && filters.numberGuests(oneAd)
      && filters.featureWiFi(oneAd)
      && filters.featureDishwasher(oneAd)
      && filters.featureParking(oneAd)
      && filters.featureWasher(oneAd)
      && filters.featureElevator(oneAd)
      && filters.featureConditioner(oneAd);
  });

  render(filteredAds);
};



typeHouse.addEventListener('change', () => {
  if (typeHouse.value === 'any') {
    filters.typeHouse = () => true;
  } else {
    filters.typeHouse = ad => typeHouse.value === ad.offer.type;
  }
  doFilter();
});

price.addEventListener('change', () => {
  switch (price.value) {
    case 'middle':
      filters.price = ad => ad.offer.price >= 10000 && ad.offer.price <= 50000;
      break;
    case 'low':
      filters.price = ad => ad.offer.price < 10000;
      break;
    case 'high':
      filters.price = ad => ad.offer.price > 50000;
      break;

    default:
      filters.price = () => true;
      break;
  }

  doFilter();
});

numberRooms.addEventListener('change', () => {
  if (numberRooms.value === 'any') {
    filters.numberRooms = () => true;
  } else {
    filters.numberRooms = ad => ad.offer.rooms === +numberRooms.value;
  }

  doFilter();
});

numberGuests.addEventListener('change', () => {
  if (numberGuests.value === 'any') {
    filters.numberGuests = () => true;
  } else {
    filters.numberGuests = ad => ad.offer.guests === +numberGuests.value;
  }

  doFilter();
});


filterWiFi.addEventListener('change', () => {
  if (filterWiFi.checked) {
    filters.featureWiFi = ad => ad.offer.features.includes(filterWiFi.value);

  } else {
    filters.featureWiFi = () => true;
  }

  doFilter();
});

filterDishwasher.addEventListener('change', () => {
  if (filterDishwasher.checked) {
    filters.featureDishwasher = ad => ad.offer.features.includes(filterDishwasher.value);
  } else {
    filters.featureDishwasher = () => true;
  }

  doFilter();
});

filterParking.addEventListener('change', () => {
  if (filterParking.checked) {
    filters.featureParking = ad => ad.offer.features.includes(filterParking.value);
  } else {
    filters.featureParking = () => true;
  }

  doFilter();
});

filterWasher.addEventListener('change', () => {
  if (filterWasher.checked) {
    filters.featureWasher = ad => ad.offer.features.includes(filterWasher.value);
  } else {
    filters.featureWasher = () => true;
  }

  doFilter();
});

filterElevator.addEventListener('change', () => {
  if (filterElevator.checked) {
    filters.featureElevator = ad => ad.offer.features.includes(filterElevator.value);
  } else {
    filters.featureElevator = () => true;
  }

  doFilter();
});

filterConditioner.addEventListener('change', () => {
  if (filterConditioner.checked) {
    filters.featureConditioner = ad => ad.offer.features.includes(filterConditioner.value);
  } else {
    filters.featureConditioner = () => true;
  }

  doFilter();
});


const filterAds = (ads, renderFunction) => {
  allAds.push(...ads);
  render = renderFunction;
  doFilter();
}


const returnFilter = () => {
  filterForm.reset();
  for (let item in filters) {
    filters[item] = () => true;
  }
  doFilter();
}


export { filterAds, returnFilter };
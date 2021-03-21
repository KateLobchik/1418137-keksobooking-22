/* global _:readonly */

const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;

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


const debounceRender = button => {
  button(_.debounce(
    () => doFilter(),
    RERENDER_DELAY,
  ))
};

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


const getAdRank = ad => {
  let rank = 0;

  if (ad.offer.type === typeHouse.value) {
    rank += 1;
  }
  if (ad.offer.price >= 10000 && ad.offer.price <= 50000 && typeHouse.value === 'middle') {
    rank += 1;
  }
  if (ad.offer.price < 10000 && typeHouse.value === 'low') {
    rank += 1;
  }
  if (ad.offer.price > 50000 && typeHouse.value === 'high') {
    rank += 1;
  }
  if (ad.offer.rooms === +numberRooms.value) {
    rank += 1;
  }
  if (ad.offer.guests === +numberGuests.value) {
    rank += 1;
  }
  const rankcheckboxFilter = filterButton => {
    if (ad.offer.features.includes(filterButton.value)) {
      rank += 1;
    }
  };

  rankcheckboxFilter(filterWiFi);
  rankcheckboxFilter(filterDishwasher);
  rankcheckboxFilter(filterParking);
  rankcheckboxFilter(filterWasher);
  rankcheckboxFilter(filterElevator);
  rankcheckboxFilter(filterConditioner);

  return rank;
};

const compareAds = (ad1, ad2) => {
  const rank1 = getAdRank(ad1);
  const rank2 = getAdRank(ad2);

  return rank2 - rank1;
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
  })
    .slice()
    .sort(compareAds)
    .slice(0, SIMILAR_AD_COUNT);

  render(filteredAds);
};


const onTypeHouseClick = (functionRender) => {
  typeHouse.addEventListener('change', () => {
    if (typeHouse.value === 'any') {
      filters.typeHouse = () => true;
    } else {
      filters.typeHouse = ad => typeHouse.value === ad.offer.type;
    }

    functionRender();
  });
}
debounceRender(onTypeHouseClick);

const onPriceClick = (functionRender) => {
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

    functionRender();
  });
}
debounceRender(onPriceClick);

const onRoomsClick = (functionRender) => {
  numberRooms.addEventListener('change', () => {
    if (numberRooms.value === 'any') {
      filters.numberRooms = () => true;
    } else {
      filters.numberRooms = ad => ad.offer.rooms === +numberRooms.value;
    }

    functionRender();
  });
}
debounceRender(onRoomsClick);

const onGuestsClick = (functionRender) => {
  numberGuests.addEventListener('change', () => {
    if (numberGuests.value === 'any') {
      filters.numberGuests = () => true;
    } else {
      filters.numberGuests = ad => ad.offer.guests === +numberGuests.value;
    }

    functionRender();
  });
}
debounceRender(onGuestsClick);

const onFeaturesClick = (functionRender) => {
  const checkboxFilter = (filterButton, feature) => {
    filterButton.addEventListener('change', () => {
      if (filterButton.checked) {
        filters[feature] = ad => ad.offer.features.includes(filterButton.value);
      } else {
        filters[feature] = () => true;
      }

      functionRender();
    });
  };

  checkboxFilter(filterWiFi, 'featureWiFi');
  checkboxFilter(filterDishwasher, 'featureDishwasher');
  checkboxFilter(filterParking, 'featureParking');
  checkboxFilter(filterWasher, 'featureWasher');
  checkboxFilter(filterElevator, 'featureElevator');
  checkboxFilter(filterConditioner, 'featureConditioner');
};
debounceRender(onFeaturesClick);


const filterAds = (ads, renderFunction) => {
  allAds.push(...ads);
  render = renderFunction;
  doFilter();
}


const resetFilter = () => {
  filterForm.reset();
  for (let item in filters) {
    filters[item] = () => true;
  }
  doFilter();
}


export { filterAds, resetFilter };

/* global _:readonly */

const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');
const typeHouse = filterForm.querySelector('#housing-type');
const price = filterForm.querySelector('#housing-price');
const numberRooms = filterForm.querySelector('#housing-rooms');
const numberGuests = filterForm.querySelector('#housing-guests');

const featuresFieldset = filterForm.querySelector('#housing-features');
const featuresInputs = featuresFieldset.querySelectorAll('input');

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
  features: () => true,
};


const doFilter = () => {
  const filteredAds = [];

  for (let oneAd of allAds) {

    if (filteredAds.length === SIMILAR_AD_COUNT) {
      break;
    }
    if (filters.typeHouse(oneAd)
      && filters.price(oneAd)
      && filters.numberRooms(oneAd)
      && filters.numberGuests(oneAd)
      && filters.features(oneAd)) {
      filteredAds.push(oneAd);
    }
  }

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
        filters.price = ad => ad.offer.price >= MIN_PRICE && ad.offer.price <= MAX_PRICE;
        break;
      case 'low':
        filters.price = ad => ad.offer.price < MIN_PRICE;
        break;
      case 'high':
        filters.price = ad => ad.offer.price > MAX_PRICE;
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


const chosenFeatures = [];
const isAdWithChosenFeatures = ad => {
  if (chosenFeatures.length === 0) {
    return true;
  }
  for (let chosenFeature of chosenFeatures) {
    if (!ad.offer.features.includes(chosenFeature)) {
      return false;
    }
  }
  return true;
}

const onFeaturesClick = (functionRender) => {
  for (let featuresInput of featuresInputs) {
    featuresInput.addEventListener('change', () => {
      filters.features = isAdWithChosenFeatures;

      if (featuresInput.checked) {
        chosenFeatures.push(featuresInput.value);
      } else {
        const indexItem = chosenFeatures.indexOf(featuresInput.value);
        chosenFeatures.splice(indexItem, 1);
      }

      functionRender();
    })
  }
}
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


export { filterForm, filterAds, resetFilter };

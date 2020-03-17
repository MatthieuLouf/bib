const fs = require('fs');

function getJavaList(jsonFile) {
  return JSON.parse(fs.readFileSync(jsonFile).toString());
}

function compareFormat(text) {
  return text.toLowerCase().replace(/[^a-zA-Z ]/g, "")
}

function newRestaurant(michelinRestaurant, maitreRestaurant) {
  return {
    "name" : michelinRestaurant.name,
    "type" : michelinRestaurant.type,
    "phone_number" : maitreRestaurant.adress.phone_number,
    "image_url" : michelinRestaurant.image_url,
    "adress" :{
      "street" : maitreRestaurant.adress.street,
      "city" : michelinRestaurant.city,
      "postal_code" : maitreRestaurant.adress.postal_code
    }
  }
}

function getRestaurantsInBothLists(michelinRestaurants, maitreRestaurants) {
  restaurants = [];

  for (let i = 0; i < michelinRestaurants.length; i++) {
    quit = false;
    for (let j = 0; j < maitreRestaurants.length && !quit; j++) {
      if (compareFormat(michelinRestaurants[i].name) == compareFormat(maitreRestaurants[j].name)
        && compareFormat(michelinRestaurants[i].city) == compareFormat(maitreRestaurants[j].adress.city)) {
        // console.log(i,michelinRestaurants[i].name, maitreRestaurants[j].name,michelinRestaurants[i].city,maitreRestaurants[j].adress.city);
        restaurants.push(newRestaurant(michelinRestaurants[i], maitreRestaurants[j]));
        quit = true;
      }
    }
  }
  return restaurants;
}

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async (michelinJsonFile, maitreJsonFile) => {
  restaurants = [];

  maitreRestaurants = getJavaList(maitreJsonFile);
  michelinRestaurants = getJavaList(michelinJsonFile);

  return getRestaurantsInBothLists(michelinRestaurants, maitreRestaurants);;
};

const fs = require('fs');

/**
 * function that return the python list from a json document located on the root folder
 * @param {String} jsonFile : a file name
 */
function getPythonList(jsonFile) {
  return JSON.parse(fs.readFileSync(jsonFile).toString());
}

/**
 * Function that format strings with the aim to compare them on the same criterias
 * @param {String} text 
 */
function compareFormat(text) {
  return text.toLowerCase().replace(/[^a-zA-Z ]/g, "")
}

/**
 * Create a new Restaurant object, from the two michelin and maitre sources
 * @param {Object} michelinRestaurant 
 * @param {Object} maitreRestaurant 
 */
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

/**
 * Function that get the restaurants found in the two lists, and return a merged objects of them
 * @param {Array} michelinRestaurants 
 * @param {Array} maitreRestaurants 
 */
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

  maitreRestaurants = getPythonList(maitreJsonFile);
  michelinRestaurants = getPythonList(michelinJsonFile);

  return getRestaurantsInBothLists(michelinRestaurants, maitreRestaurants);;
};

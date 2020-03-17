const fs = require('fs');

function getJavaList(jsonFile) {
  return JSON.parse(fs.readFileSync(jsonFile).toString());
}

function getRestaurantsInBothLists(michelinRestaurants, maitreRestaurants) {
  for (let i = 0; i < michelinRestaurants.length; i++) {
    quit = false;
    for (let j = 0; j < maitreRestaurants.length && !quit; j++) {
      if (michelinRestaurants[i].name.toLowerCase() == maitreRestaurants[j].name.toLowerCase()) {
        console.log(i,michelinRestaurants[i].name, maitreRestaurants[j].name);
        quit=true;
      }
    }
  }
}

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async (michelinJsonFile, maitreJsonFile) => {
  restaurants = [];

  maitreRestaurants = getJavaList(maitreJsonFile);
  michelinRestaurants = getJavaList(michelinJsonFile);

  getRestaurantsInBothLists(michelinRestaurants, maitreRestaurants);

  return restaurants;
};

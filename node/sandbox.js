/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre = require('./maitre');
const bib = require('./bib');
const fs = require('fs');

const maitreJsonFile = "maitre.json"
const michelinJsonFile = "michelin.json"

/**
 * Function that save an document array into a json file
 * @param {Array} document 
 * @param {String} file 
 */
function saveDocument(document, file) {
  fs.writeFile(file, document, function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    return console.log("JSON " + file + " has been saved.");
  });
}

/**
 * Function that retrieve the list of bib restaurants from michelin and save it into a json file
 * @param {String} jsonFile 
 */
async function saveMichelin(jsonFile) {
  try {
    let restaurants = await michelin.get();
    var jsonContent = JSON.stringify(restaurants);
    saveDocument(jsonContent, jsonFile)

  } catch (e) {
    console.error(e);
  }
}

/**
 * Function that retrieve the list of restaurants from maitre restaurateurs and save it into a json file
 * @param {String} jsonFile 
 */
async function saveMaitre(jsonFile) {
  try {
    let restaurants = await maitre.get();
    var jsonContent = JSON.stringify(restaurants);
    saveDocument(jsonContent, jsonFile)

  } catch (e) {
    console.error(e);
  }
}

/**
 * Functions that retrieve the merged restaurants list of two json lists
 */
async function getBothRestaurants() {
  try {
    const restaurants = await bib.get(michelinJsonFile, maitreJsonFile);

    console.log(restaurants);

  } catch (e) {
    console.error(e);
  }
}

async function main() {
  // await saveMichelin(michelinJsonFile);
  // await saveMaitre(maitreJsonFile);


  await getBothRestaurants();
}

main()
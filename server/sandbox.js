/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const maitre = require('./maitre');
const fs = require('fs');

function saveDocument(document,file)
{
  fs.writeFile(file, document, function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    return console.log("JSON "+ file+" has been saved.");
  });
}

async function saveMichelin() {
  try {
    const restaurants = await michelin.get();
    var jsonContent = JSON.stringify(restaurants);
    saveDocument(jsonContent,"michelin.json")

  } catch (e) {
    console.error(e);
  }
}

async function saveMaitre() {
  try {
    const restaurants = await maitre.get();
    var jsonContent = JSON.stringify(restaurants);
    saveDocument(jsonContent,"maitre.json")

  } catch (e) {
    console.error(e);
  }
}

saveMichelin();
saveMaitre();

/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');

async function sandbox () {
  try {

    const restaurants = await michelin.get();

    restaurants.forEach(restaurant => {
      console.log(restaurant.name);
    })

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox();

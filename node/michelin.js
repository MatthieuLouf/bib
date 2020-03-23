const axios = require('axios');
const cheerio = require('cheerio');

michelin_page_url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/"

/**
 * Format function to remove disturbing characters on text informations
 * @param {String} text 
 */
function format(text) {
  return text.replace(/\n/g, '').replace(/            /g, '').replace(/    /g, ''); //remove white spaces and \n
}

/**
 * Format function to remove "url" part in image url, and remove disturbing characters
 * @param {String} text 
 */
function formatImage(text) {
  return text !== undefined ? text.replace('url(', '').replace(')', '').replace(/\"/gi, "") : text;
}


/**
 * Main function to scrap a michelin page from the given url, return a list of restaurants of the page
 * @param String url 
 */
async function scrapPage(url) {
  BibRestaurants = [];
  const response = await axios(url); // retrieve the html of the page
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data)
    const statsTable = $('.restaurant__list-row > div'); // focus on the list of restaurants div

    statsTable.each(function () {
      let restaurant = new Object() // Create a new object to add the restaurant infos
      restaurant.name = format($(this).find('.card__menu > .card__menu-content > .card__menu-content--title >  a').text());
      restaurant.city = format($(this).find('.card__menu > .card__menu-footer > .card__menu-footer--location').text());
      restaurant.type = format($(this).find('.card__menu > .card__menu-footer > .card__menu-footer--price').text());
      restaurant.image_url = formatImage($(this).find('.card__menu > .card__menu-image > a ').attr('data-bg')); // get the image url from a data-bg parameter on the div

      if (restaurant.name != '') {
        BibRestaurants.push(restaurant);
      }
    });

  }
  return BibRestaurants;

}

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = async () => {
  restaurants = [];

  for (let i = 1; i <= 15; i++) // loop on the 15 pages of michelin bib restaurants
  {
    temp = await scrapPage(michelin_page_url + i);
    restaurants = [].concat(restaurants, temp) // merge the global list and the new page list
  }
  return restaurants;
};

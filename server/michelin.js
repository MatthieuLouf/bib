const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data);
  const name = $('.section-main h2.restaurant-details__heading--title').text();
  const experience = $('#experience-section > ul > li:nth-child(2)').text();

  return { name, experience };
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};

michelin_page_url = "https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/"

function format(text){
  return text.replace(/\n/g,'').replace(/            /g,'').replace(/    /g,'');
}

function formatImage(text){
  return text !== undefined ? text.replace('url(','').replace(')','').replace(/\"/gi, "") : text;
}

async function scrapPage(url) {
  BibRestaurants = [];
  const response = await axios(url);
  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data)
    const statsTable = $('.restaurant__list-row > div');

    statsTable.each(function () {
      let restaurant = new Object()
      restaurant.name = format($(this).find('.card__menu > .card__menu-content > .card__menu-content--title >  a').text());
      restaurant.city = format($(this).find('.card__menu > .card__menu-footer > .card__menu-footer--location').text());
      restaurant.type = format($(this).find('.card__menu > .card__menu-footer > .card__menu-footer--price').text());
      restaurant.image_url = formatImage($(this).find('.card__menu > .card__menu-image > a ').attr('data-bg'));

      BibRestaurants.push(restaurant);
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

  for(let i =1; i<=15;i++)
  {
    temp = await scrapPage(michelin_page_url + i);
    restaurants = [].concat(restaurants,temp)
  }
  return restaurants;
};

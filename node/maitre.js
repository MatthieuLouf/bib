const axios = require('axios');
const cheerio = require('cheerio');

maitre_page_url = "https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult"

/**
 * Format function to remove disturbing characters on a text describing an adress
 * @returns {Object} adress
 * @param {String} text 
 */
function formatAdress(text) {
  let adress = new Object()
  if (text != '') {
    textTab = text.replace(/            /g, '').replace(/  /g, '').replace(/    /g, '').split('\n'); //remove white spaces and \n
    adress.street = textTab[1];
    cityTab = textTab[4].split(' ');
    adress.postal_code = cityTab[0];
    adress.city = cityTab[1];
    adress.phone_number = textTab[6];
  }

  return adress;
}

/**
 * Format function to remove disturbing characters from a text
 * @param {String} text 
 */
function formatName(text) {
  text = text.replace(/\n/g, '').replace(/            /g, '').replace(/    /g, '');
  return text.replace(/([\[(])(.+?)([\])])/g, '').replace(/   /g, '');
}

/**
 * Format function to add a website prefix to a text url path
 * @param {String} text 
 */
function formatImage(text) {
  return "https://www.maitresrestaurateurs.fr" + text;
}

/**
 * Main scrapping method that scrap a page of maitre restaurateurs
 * @param {String} url 
 * @param {number} pageNum 
 */
async function scrapPage(url, pageNum) {
  BibRestaurants = [];
  const response = await axios({
    method: 'post',
    url: url,
    data: 'page=' + pageNum + '&sort=undefined&request_id=84019653bef80adf1da8e5e7c3438b37&annuaire_mode=&annuaire_action=&annuaire_action_arg=&annuaire_appli=&annuaire_as_no='
  }); // define the request parameters to the post request, specially the page number of the restaurants to be scrapped

  const { data, status } = response;  // load the html of the response in data

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data)

    const statsTable = $('.annuaire_result_list > div'); // focalize on the list of restaurants div

    statsTable.each(function () {

      let restaurant = new Object(); // define the restaurant object, to be filled with its informations
      restaurant.name = formatName($(this).find('.single_desc > .single_libel  >  a').text());
      restaurant.adress = formatAdress($(this).find('.single_desc > .single_details > .single_info3 > div > div').text());
      restaurant.image_url = formatImage($(this).find('.ologo > .model-image > .containerImg > .click-img > a > img ').attr('src')); // get the image url from the img src

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

  for (let i = 1; i <= 154; i++) // loop on the 154 pages of maitre restaurateurs restaurants
  {
    temp = await scrapPage(maitre_page_url, i);
    restaurants = [].concat(restaurants, temp) // merge the global list and the new page list
  }
  return restaurants;
};

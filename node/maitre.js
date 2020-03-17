const axios = require('axios');
const cheerio = require('cheerio');

maitre_page_url = "https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult"

function formatAdress(text) {
  let adress = new Object()
  if (text != '') {
    textTab = text.replace(/            /g, '').replace(/  /g, '').replace(/    /g, '').split('\n');
    adress.street = textTab[1];
    cityTab = textTab[4].split(' ');
    adress.postal_code = cityTab[0];
    adress.city = cityTab[1];
    adress.phone_number = textTab[6];

  }

  return adress;
}

function formatName(text) {
  text = text.replace(/\n/g, '').replace(/            /g, '').replace(/    /g, '');
  return text.replace(/([\[(])(.+?)([\])])/g, '').replace(/   /g, '');
}

function formatImage(text) {
  return "https://www.maitresrestaurateurs.fr" + text;
}

async function scrapPage(url, pageNum) {
  BibRestaurants = [];
  const response = await axios({
    method: 'post',
    url: url,
    data: 'page=' + pageNum + '&sort=undefined&request_id=84019653bef80adf1da8e5e7c3438b37&annuaire_mode=&annuaire_action=&annuaire_action_arg=&annuaire_appli=&annuaire_as_no='
  });

  const { data, status } = response;

  if (status >= 200 && status < 300) {
    const $ = cheerio.load(data)

    const statsTable = $('.annuaire_result_list > div');

    statsTable.each(function () {

      let restaurant = new Object()
      restaurant.name = formatName($(this).find('.single_desc > .single_libel  >  a').text());
      restaurant.adress = formatAdress($(this).find('.single_desc > .single_details > .single_info3 > div > div').text());
      restaurant.image_url = formatImage($(this).find('.ologo > .model-image > .containerImg > .click-img > a > img ').attr('src'));

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

  for (let i = 1; i <= 154; i++) {
    temp = await scrapPage(maitre_page_url, i);
    restaurants = [].concat(restaurants, temp)
  }
  return restaurants;
};

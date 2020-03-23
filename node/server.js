'use strict'
const http = require('http')
const bib = require('./bib');

const express = require('express');
var cors = require('cors');

const maitreJsonFile = "maitre.json"
const michelinJsonFile = "michelin.json"

let app = express();
let port = 8080;

/**
 * Functions that retrieve the merged restaurants list of two json lists
 */
async function getBothRestaurants() {
    try {
        const restaurants = await bib.get(michelinJsonFile, maitreJsonFile);

        return restaurants;

    } catch (e) {
        console.error(e);
    }
}

app.use(cors());

/**
 * API route to get request to retrieve the lists of restaurants
 */
app.get('/restaurants', async function (req, res) {
    const restaurants = await getBothRestaurants()

    res.send(restaurants);
})

// Start the server, and listen to the port !
app.listen(port, () => { console.log("Serveur launched ! :D"); })
'use strict'
const http = require('http')
const bib = require('./bib');

const express = require('express');
var cors = require('cors');

const maitreJsonFile = "maitre.json"
const michelinJsonFile = "michelin.json"

let app = express();
let port = 8080;

async function getBothRestaurants() {
    try {
        const restaurants = await bib.get(michelinJsonFile, maitreJsonFile);

        return restaurants;

    } catch (e) {
        console.error(e);
    }
}

app.use(cors());

app.get('/restaurants', async function (req, res) {
    const restaurants = await getBothRestaurants()

    res.send(restaurants);
})

app.listen(port, () => { console.log("Serveur launched ! :D"); })
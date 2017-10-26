#! /usr/bin/env node

const async = require( 'async');
const Place = require( './models/place');
const Location = require( './models/location');
const PlaceInfo = require( './models/place_info');
const Image = require( './models/image');
const mongoose = require( 'mongoose');

let places = [];
let locations = [];
let placeInfos = [];
let images = [];

let userArgs = process.argv.slice( 2);
if (!userArgs[0].startsWith( 'mongodb://')) {
    console.log( 'ERROR: valid mongodb URL as the first argument required');
} else {
    const mongoDB = userArgs[0];
    mongoose.connect( mongoDB);
    mongoose.connection.on( 'error',
        console.error.bind( console, 'MongoDB connection error:'));

    async.series([
        createPlaces,
        createPlaceInfos,
        createLocations,
        createImages,
    ],
    (err, results) => {
        if (err) {
            console.log( 'FINAL ERR: ' + err);
        } else {
            console.log( 'Places: ' + places);
        }

        mongoose.connection.close();
    });
}

function placeCreate( name, location, info, images, cb) {
    let placedetail = {name: name};
    if (location != false) {
        placedetail.location = location;
    }
    if (info != false) {
        placedetail.info = info;
    }
    if (images != false) {
        placedetail.images = images;
    }

    let place = new Place( placedetail);
    place.save((err) => {
        if (err) {
            cb( err, null);
            return;
        }

        places.push( place);
        cb( null, place);
    });
}

function locationCreate( name, cb) {
    let locationDetail = {name: name};

    let location = new Location( locationDetail);
    location.save( (err) => {
        if (err) {
            cb( err, null);
            return;
        }

        locations.push( location);
        cb( null, location);
    });
}

function placeInfoCreate( info, cb) {
    let placeInfoDetail = {info: info};

    let placeInfo = new PlaceInfo( placeInfoDetail);
    placeInfo.save((err) => {
        if (err) {
            cb( err, null);
            return;
        }
        placeInfos.push( placeInfo);
        cb( null, placeInfo);
    });
}


function imageCreate( alt, size, url, type, cb) {
    let imageDetail = {alt: alt, url: url};
    if (size != false) {
        imageDetail.size = size;
    }

    if (type != false) {
        imageDetail.type = type;
    }

    let image = new Image( imageDetail);
    image.save((err) => {
        if (err) {
            cb( err, null);
            return;
        }

        images.push( image);
        cb( null, image);
    } );
}


function createPlaces(cb) {
    async.parallel([
        (callback) => {
            placeCreate( 'World Heritage Center', false, false, false, callback);
        },
    ],
      cb);
}


function createLocations(cb) {
    async.parallel([
        (callback) => {
            locationCreate( '112, 113', callback);
        },
    ],
      cb);
}


function createPlaceInfos(cb) {
    async.parallel([
        (callback) => {
            placeInfoCreate(
              'The World Heritage Center is a must visit', callback);
        },
    ],
      cb);
}

function createImages(cb) {
    async.parallel([
        (callback) => {
            imageCreate(
              'London Gollancz, 2014.',
              {width: 300, height: 200},
              './images',
              'panorama',
              callback);
        },
    ],
      cb);
}



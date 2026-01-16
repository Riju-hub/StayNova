// const mongoose=require('mongoose');
// const initData=require('./data.js');
// const Listing=require('../models/listing.js');

// const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

// main().then(()=>console.log("Connected to MongoDB")).catch(err=>console.log(err));
// async function main() {
//     await mongoose.connect(MONGO_URL);
// };

// const initDB=async()=>{
//     await Listing.deleteMany({});
//     initData.data=initData.data.map((obj)=>({...obj,owner:'69429c78990bc07a7a1d2b8e'}))
//     const listingsWithImageUrl = initData.data.map((obj) => ({
//         ...obj,
//         image: {
//     url: obj.image.url,
//     filename: obj.image.filename
//   }
//     }));

//     // 4. Insert the new, corrected array
//     await Listing.insertMany(listingsWithImageUrl);
//     console.log("data was initialized");
// };

// initDB();

const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const { Client } = require("@googlemaps/google-maps-services-js");
require('dotenv').config(); // Load your API Key

const client = new Client({});
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));
async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async () => {
    await Listing.deleteMany({});

    // Process each listing to add Owner and Coordinates
    const processedData = await Promise.all(initData.data.map(async (obj) => {
        // 1. Geocode the location string
        // let lat = 28.6139, lng = 77.2090; // Default fallbacks
        // try {
        //     const response = await client.geocode({
        //         params: {
        //             address: obj.location,
        //             key: process.env.MAP_API_KEY,
        //         },
        //     });
        //     if (response.data.results.length > 0) {
        //         lat = response.data.results[0].geometry.location.lat;
        //         lng = response.data.results[0].geometry.location.lng;
        //     }
        // } catch (e) {
        //     // console.log(`Error geocoding ${obj.location}:`, e.message);
        // }

        return {
            ...obj,
            owner: '69429c78990bc07a7a1d2b8e',
            // lat: lat,
            // lng: lng,
            image: {
                url: obj.image.url,
                filename: obj.image.filename
            }
        };
    }));

    await Listing.insertMany(processedData);
    console.log("Data was initialized with coordinates!");
};

initDB();
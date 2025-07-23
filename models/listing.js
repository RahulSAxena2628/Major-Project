// Description: This file contains the schema and model for the listing collection.
// const mongoose = require('mongoose');
// const express = require('express');
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     description: String,
//     image: {
//         filename: String,
//         url: String,
//         default:"https://images.unsplash.com/photo-1735337634443-6e37a373e501?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set: (v) => v === "" ? "https://images.unsplash.com/photo-1735337634443-6e37a373e501?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
//     },
//     price: Number,
//     location: String,
//     country: String,
// });

// const Listing = mongoose.model('Listing', listingSchema);
// module.exports = Listing;

const mongoose = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
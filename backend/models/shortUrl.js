// Import required modules and packages
const mongoose = require('mongoose');
const shortId = require('shortid');

// Define the Schema for the ShortUrl model
const shortUrlSchema = new mongoose.Schema({
    // Full URL field, required for each ShortUrl document
    full: {
        type: String,
        required: true
    },
    // Short URL field, required for each ShortUrl document, and generated using shortid package
    short: {
        type: String,
        required: true,
        default: shortId.generate // Default value is generated using shortid package
    },
    // Clicks field to store the number of times the short URL has been clicked, default is 0
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
});

// Export the ShortUrl model with the defined schema
module.exports = mongoose.model('ShortUrl', shortUrlSchema);
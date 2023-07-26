// Import required modules and packages
const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl'); // Assuming the model is defined in 'models/shortUrl.js'
var app = express();

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set the view engine to use EJS templates
app.set('view engine', 'ejs');

// Middleware to parse the request body
app.use(express.urlencoded({ extended: false }));

// Route to display the list of shortened URLs
app.get('/', async (req, res) => {
    // Fetch all short URLs from the database
    const shortUrls = await ShortUrl.find();
    // Render the 'index' view and pass the list of short URLs to the template
    res.render('index', { shortUrls: shortUrls });
});

// Route to create a new short URL
app.post('/shortUrls', async (req, res) => {
    // Create a new ShortUrl document in the database with the full URL provided in the request body
    await ShortUrl.create({ full: req.body.fullUrl });
    // Redirect back to the homepage after creating the short URL
    res.redirect('/');
});

// Route to handle short URL redirection
app.get('/:shortUrl', async (req, res) => {
    // Find the corresponding short URL document in the database based on the provided short code
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

    // If the short URL does not exist in the database, return a 404 Not Found status
    if (shortUrl == null) return res.sendStatus(404);

    // Increment the clicks count for the short URL and save the updated document in the database
    shortUrl.clicks++;
    shortUrl.save();

    // Redirect the user to the original (full) URL by clicking on the short URL
    res.redirect(shortUrl.full);
});

// Start the server and listen on the specified port or a default port 5000
app.listen(process.env.PORT || 5000);
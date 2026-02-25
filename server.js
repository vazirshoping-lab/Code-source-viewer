const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const { data } = await axios.get('https://example.com'); // Replace with the target URL
        const $ = cheerio.load(data);
        // Example: scrape title
        const title = $('title').text();
        res.send(`<h1>${title}</h1>`);
    } catch (error) {
        res.status(500).send('Error occurred while scraping the page.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
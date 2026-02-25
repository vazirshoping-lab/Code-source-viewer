'use strict';

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Web scraping endpoint
app.get('/scrape', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL parameter is required.');
    }

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        // An example of extracting data - modify according to the webpage structure
        const scrapedData = [];
        $('h1').each((i, element) => {
            scrapedData.push($(element).text());
        });

        res.json(scrapedData);
    } catch (error) {
        res.status(500).send('Error scraping the URL.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

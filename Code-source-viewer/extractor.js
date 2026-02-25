const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Example: Extracting all code snippets
        const codeSnippets = [];
        $('pre code').each((i, element) => {
            codeSnippets.push($(element).text());
        });

        return codeSnippets;
    } catch (error) {
        console.error('Error scraping data:', error);
        return [];
    }
}

// Example usage
const url = 'https://example.com';
scrapeData(url).then(snippets => {
    console.log('Extracted Code Snippets:', snippets);
});

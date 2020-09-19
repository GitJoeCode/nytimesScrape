// Require axios and cheerio to make scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function scrapes NYTimes website
var scrape = function() {

  return axios.get("http://www.nytimes.com").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");
    
    // Empty array to save article info
    var articles = [];

    // Find & loop through each element with ".assetWrapper" class
    $(".assetWrapper").each(function(i, element) {
      
      // Headline
      var head = $(this)
        .find("h2")
        .text()
        .trim();

      // URL
      var url = $(this)
        .find("a")
        .attr("href");

      // Summary
      var sum = $(this)
        .find("p")
        .text()
        .trim();


      if (head && sum && url) {
        // Trim & tidy our headlines and summaries
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array
        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.nytimes.com" + url
        };

        // Push new article into array
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;

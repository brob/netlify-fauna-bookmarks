import { getDetails, saveBookmark } from "./bookmarks/create";

const rp = require('request-promise');

const rebuildSite = function() {
  var options = {
    method: 'POST',
    uri: 'https://api.netlify.com/build_hooks/5d7fa6175504dfd43377688c',
    body: {},
    json: true // Automatically stringifies the body to JSON

  };

  console.log('Rebuilding the site ... ');
  return rp(options);

}

exports.handler = async function(event, context) {
  try {
    const url = event.queryStringParameters.url;
    const details = await getDetails(url);
    
    const savedResponse = await saveBookmark({url, ...details});
    console.log(savedResponse);

    if (savedResponse.statusCode === 200) {

      rebuildSite();

      return { statusCode: 200, body: savedResponse.body }
    } else {
      return savedResponse
    }

    
  } catch (err) {
    return { statusCode: 500, body: `Error: ${err}` };
  }

};
  
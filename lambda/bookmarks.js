import { getDetails, saveBookmark } from "./bookmarks/create";
import { rebuildSite } from "./utilities/rebuild";
const rp = require('request-promise');



exports.handler = async function(event, context) {
  try {
    if (event.queryStringParameters.apiKey != process.env.API_KEY) throw "Not Authorized";

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
  
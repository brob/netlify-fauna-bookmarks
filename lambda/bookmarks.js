import { getDetails, saveBookmark } from "./bookmarks/create";

exports.handler = async function(event, context) {
  try {
    const url = event.queryStringParameters.url;
    const details = await getDetails(url);
    
    const savedResponse = await saveBookmark({url, ...details});
    console.log(savedResponse);

    if (savedResponse.statusCode === 200) {
      return { statusCode: 200, body: savedResponse.body }
    } else {
      return savedResponse
    }

    
  } catch (err) {
    return { statusCode: 500, body: `Error: ${err}` };
  }

};
  
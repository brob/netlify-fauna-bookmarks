const rp = require('request-promise');
const cheerio = require('cheerio');
var faunadb = require('faunadb'),
    q = faunadb.query;


var adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});
async function getDetails(url) {
  const data = rp(url).then(function(htmlString) {
    const $ = cheerio.load(htmlString);
    const title = $('head > title').text();
    const description = $('meta[name="description"]').attr('content');
    return {
      pageTitle: title,
      description: description
    };
  });

  


  return data
}

async function saveBookmark(details) {
  const data = {
    data: details
  };
  console.log(data);
  return adminClient.query(q.Create(q.Collection("links"), data))
    .then((response) => {
      console.log("success", response)
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return  {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
  console.log(details);
}

exports.handler = async function(event, context) {
  try {
    const url = event.queryStringParameters.url;
    const details = await getDetails(url);
    
    const saved = saveBookmark({url, ...details})

    console.log(saved);

    return { statusCode: 200, body: "Sucess" }
  } catch (err) {
    return { statusCode: 500, body: "lambda failure code!" };
  }

};
  
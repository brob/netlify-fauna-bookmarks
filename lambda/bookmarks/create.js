const rp = require('request-promise');
const cheerio = require('cheerio');
var faunadb = require('faunadb'),
    q = faunadb.query;

var adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});


const getDetails = async function(url) {
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

const saveBookmark = async function(details) {
  const data = {
    data: details
  };
  return adminClient.query(q.Create(q.Collection("links"), data))
    .then((response) => {
      /* Success! return the response with statusCode 200 */
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      /* Error! return the error with statusCode 400 */
      return  {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}

export { getDetails, saveBookmark }

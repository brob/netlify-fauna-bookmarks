const rp = require('request-promise');
const cheerio = require('cheerio');

const faunadb = require('faunadb'),
    q = faunadb.query;

var adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

// function rebuildSite() {
//   let url = `https://api.netlify.com/build_hooks/${process.env.build_hook_id}`;
//   console.log(url);
//   const options = {
//     method: "POST",
//     uri: url
//   }
//   return rp(options)
//     .then(() => console.log("Posted and Rebuilding"))
//     .catch((err) => console.log(err));
// }

async function createBookmark(value) {
  return new Promise((resolve, reject) => {
    let values = {
      url: value.url,
      pageTitle: value.pagetitle,
      description: value.description
    }

    console.log('values', values);

    return adminClient.query(q.Create(q.Collection("links"), values))
    .then((response) => {
      console.log("success", response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("error", error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })

  });
    

}


function getDetails(html) {
  console.log('getting details');
  const details = {};
  const $ = cheerio.load(html);
  console.log($('title'));
  details['pagetitle'] = $('head > title').text();
  details['description'] = $('meta[name="description"]').attr('content');
  return details
}



exports.handler = async function create(event, context) {
    // try {
    //   console.log('inside try in handler');
    //   const details = await rp(event.queryStringParameters.url)
    //   .then((html) => getDetails(html))
    //   .catch((err) => console.log(err));
      

    //   const body = await createBookmark({url: event.queryStringParameters.url, ...details})
    //   .then((data) => {
    //     // rebuildSite();
    //     return data
    //   })
    //   .catch((err) => console.log(err));
      

    //   return { statusCode: 200, body };
    // } catch (err) {
    //   return { statusCode: 500, body: "lambda failure code!" };
    // }
    return "inside create"
  };
  
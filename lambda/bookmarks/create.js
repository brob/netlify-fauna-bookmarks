const rp = require('request-promise');
const cheerio = require('cheerio');

const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: process.env.SANITY_PROJECT,
  dataset: 'production',
  token: process.env.SANITY_KEY, // or leave blank to be anonymous user
  useCdn: true // `false` if you want to ensure fresh data
})


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
    ...details,
    _type: "bookmark"
  };
  return client.create(data)
    .then(res => {
      console.log("success", res)
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      }
    })
    .catch(err => {
      console.log(err)
      return {
        statusCode: 400,
        body: JSON.stringify(err)
      }
    })
}

export { getDetails, saveBookmark }

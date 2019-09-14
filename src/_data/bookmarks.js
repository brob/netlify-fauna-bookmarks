var faunadb = require('faunadb'),
    q = faunadb.query;


var adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

function getBookmarks() {

    return adminClient.query(q.Paginate(q.Match(q.Ref("indexes/all_links"))))
    .then((response) => {
        const linkRefs = response.data;
        console.log("linkRefs: ", linkRefs);
    
        const getAllLinksDataQuery = linkRefs.map((ref) => {
            return q.Get(ref)
        })
        console.log(getAllLinksDataQuery);
    
        return adminClient.query(getAllLinksDataQuery).then(ret => {
            return ret
        })
    }).catch(error => {
        return error
    })
}

function mapBookmarks(data) {
    console.log('cleaning', data);
    return data.map(bookmark => {
        return { time: bookmark.ts, ...bookmark.data }
    })
}

// async function getBookmarks() {
    // if (process.env.CONTEXT == "production") {
    //     var url = `https://brobmarks.netlify.com/.netlify/functions/bookmarks`;
    // } else { 
    //     var url = `http://localhost:9000/.netlify/functions/bookmarks`
    // }
    // console.log(`this is the url: ${url}`);

    // let data = await axios.get(url)
    // .then(function (response) {
    //     console.log(`Returned: ${response.data.length} bookmark(s)`);
    //     return response.data;
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });
    // return data;
// }

module.exports = async function() {
    const data = mapBookmarks(await getBookmarks());
    console.log("data", data);
    return data
    
}
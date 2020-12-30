require('dotenv').config()

var faunadb = require('faunadb'),
    q = faunadb.query;

var adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

function getBookmarks() {
    return adminClient.query(q.Paginate(
        q.Match(
            q.Ref("indexes/all_links")
        )
    ))
    .then((response) => {
        const linkRefs = response.data;
        const getAllLinksDataQuery = linkRefs.map((ref) => {
            return q.Get(ref)
        })

        return adminClient.query(getAllLinksDataQuery).then(ret => {
            return ret
        })
    }).catch(error => {
        return error
    })
}

function mapBookmarks(data) {
    return data.map(bookmark => {
        const dateTime = new Date(bookmark.ts / 1000);

        return { time: dateTime, ...bookmark.data }
    })
}

module.exports = async function() {
    const data = mapBookmarks(await getBookmarks());
    return data.reverse()
    
}
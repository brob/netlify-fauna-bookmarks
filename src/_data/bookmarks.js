const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: 'myf3wh95',
    dataset: 'production',
    useCdn: true // `false` if you want to ensure fresh data
})

const query = `*[_type == "bookmark"] | order(_createdAt desc)`
module.exports = async function() {
    const data = await client.fetch(query)
    return data
}
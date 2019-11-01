const searchField = document.querySelector('#searchApp');
const results = document.querySelector('#results');
let bookmarks;

const fetchBookmarks = async () => {
    bookmarks = await fetch('/bookmarks.json')
        .then(response => response.json())
        .catch(err => err);

    return true
}


function filterBookmarks(searchString) {
    let filtered = []
    console.log(searchString.length);
    if (searchString.length > 0) {
        filtered = bookmarks.filter(bookmark => {
            return bookmark.pageTitle.toLowerCase().includes(searchString.toLowerCase());
        });
    } else { filtered = []; console.log('else!')}
    console.log('filter', filtered.length);
    return filtered
}

function handleSearch(event) {
    const filtered = filterBookmarks(this.value);
    if (filtered.length < bookmarks.length && filtered.length > 0) {
        showBookmarks(filtered);
    } else {
        console.log('remove!');
        document.querySelector('.searchResults').remove();
    }
}

const showBookmarks = async (bookmarks) => {
    const searchMarkup = `
        <div class="searchResults">
            <h3 class="searchResults__title">Search Results</h3>
            ${renderBookmarks(bookmarks)}
        </div>
    `
    results.innerHTML = searchMarkup;
}
function renderBookmarks(bookmarks) {
    return `
        <ul class="searchMarks">
            ${bookmarks.map(bookmark => `
                <li><a href="${bookmark.url}">${bookmark.pageTitle}</a></li>
            `).join('')}
        </ul>
    `
}

(function() {
    fetchBookmarks();
    searchField.addEventListener("input", handleSearch);
})();

console.log('connected!');

const mainPage = document.querySelector('.MainPage');
console.log('results div', mainPage);

// need to make url adjustable later
let searchBaseUrl = 'https://itunes.apple.com/search?term='

let searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', (event) => {
    let searchUrl = '';
    event.preventDefault();
    let userEntry = document.querySelector('#userEntry');
    let searchQuery = userEntry.value;
    let adjustedUserEntry = searchQuery.replace(/\s/g, '+');
    searchUrl = `${searchBaseUrl}${adjustedUserEntry}`;
    console.log(searchUrl);
    getSearchResults(searchUrl);
    // window.location.reload();
});

function getSearchResults(url) {
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    // response is whatever the fetch returns
    .then(response => {
        if (response.ok) {
        return response.json();
    }
    throw new Error('Request Failed!');
    }, networkError => console.log(networkError.message)
    )
    .then(data => {
        let songs = data.results;
        console.log(songs);
        bringUpResults(songs);
    })
}

function bringUpResults (resultArray) {
        for (let result of resultArray) {
            // Variable creation to create elements
            const resultBox = document.createElement('div');
            const imageBox = document.createElement('img');
            const songnameBox = document.createElement('h2');
            const artistBox = document.createElement('h3');
            const albumBox = document.createElement('p');
            const dateBox = document.createElement('p');
            //adding classes to elements created
            resultBox.classList.add("results");
            imageBox.classList.add("pics");
            songnameBox.classList.add("songs");
            artistBox.classList.add("artists");
            albumBox.classList.add("albums");
            dateBox.classList.add("dates");
            //entering information for elements
            imageBox.src = result.artworkUrl100;
            songnameBox.innerText = `"${result.trackName}"`;
            artistBox.innerText = `${result.artistName}`;
            albumBox.innerText = `${result.collectionName}`;
            dateBox.innerText = `Release Date: ${moment(result.releaseDate).format('MMM D, Y')}`
            //appending elements
            mainPage.appendChild(resultBox);
            resultBox.appendChild(imageBox);
            resultBox.appendChild(songnameBox);
            resultBox.appendChild(artistBox);
            resultBox.appendChild(albumBox);
            resultBox.appendChild(dateBox);
        }
    }
//GENIUS LYRICS API

import config from './config.js'; // API information stored in config.js. File added to gitIgnore.

// API Details
const apiKey1 = config.apiKey1;
const apiHost1 = config.apiHost1;

// Event listener for the search button click
document.getElementById('search-btn').addEventListener('click', function () {
    const songQuery = document.getElementById('search-input').value;
    const artistQuery = document.getElementById('artist-input').value; // Get artist input

    if (songQuery) {
        searchSong(songQuery, artistQuery);
        searchVideos() // Passes song query
    }
});

// Function to search for songs
async function searchSong(songQuery, artistQuery) {
    //RapidAPI code snippet for Genius API
    const url = `https://${apiHost1}/search/?q=${encodeURIComponent(songQuery)}&per_page=10&page=1`; //encodeURIComponent function to update non URL safe characters.
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey1,
            'x-rapidapi-host': apiHost1
        }
    };

    try {
        const response = await fetch(url, options);

        const data = await response.json(); //Parse result data to JSON
        console.log("Song Data:", data); //Logs results for review in debugger
        displayResults(data, songQuery, artistQuery); // Pass both input queries to displaySongs function 
    } catch (error) {
        console.error("Error fetching song information:", error);
        document.getElementById('song-info').style.display = 'none'; // Hide container when there is an error
        document.getElementById('lyrics-content').innerText = 'Error fetching song information';
    }

}

// Function to retreive song lyrics by song ID
//RapidAPI code snippet for Genius API - Song Lyric Search
async function fetchSongLyrics(songId) {
    const url = `https://${apiHost1}/song/lyrics/?id=${songId}`; // Construct the API URL here
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey1,
            'x-rapidapi-host': apiHost1
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        const data = await response.json(); //Parse result data to JSON
        console.log("Lyrics data:", data); //Log results to review in debugger

        const lyricsContainer = document.getElementById('lyrics-content');

        if (data.lyrics) {
            const tempDiv = document.createElement("div"); //Create temporary container to remove html elements from lryic data
            tempDiv.innerHTML = data.lyrics.lyrics.body.html; //Add data to tempory div
            lyricsContainer.innerText = tempDiv.innerText; //Use innerText method to remove HTML tags and populate lyric container


        } else {
            lyricsContainer.innerText = 'Lyrics not available.'; //Message if Lyrics for song does not exist
        }
    } catch (error) {
        console.error("Error fetching song lyrics:", error); //Log error message
        document.getElementById('lyrics-content').innerText = 'Error fetching lyrics.';
    }
}

// function to format search query to remove any additional space to improve matching
function formatString(str) {
    return str
            .toLowerCase() // Convert to lowercase
            .replace(/[^\w\s]/gi, '') // Remove punctuation and special characters
            .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
            .trim(); // Remove leading/trailing spaces
}

// Function to display search results
function displayResults(data, songQuery, artistQuery) {
    const songInfoContainer = document.getElementById('song-info');
    const lyricsContainer = document.getElementById('lyrics');

    // Hide all sections initially
    songInfoContainer.style.display = 'none';
    lyricsContainer.style.display = 'none';

    if (data.hits && data.hits.length > 0) {
        // format queries to make them more lenient
        const formattedSongQuery = formatString(songQuery);
        const formattedArtistQuery = artistQuery ? formatString(artistQuery) : ''; // format artict query if exists

        // Filter results based on the song title and artist name if provided
        const filteredHits = data.hits.filter(hit => {
            const songTitle = formatString(hit.result.title_with_featured);
            const artistName = formatString(hit.result.primary_artist.name);

            // Check if the song matches and, if an artist is provided, it also matches the artist
            const songMatches = songTitle.includes(formattedSongQuery);
            const artistMatches = artistQuery ? artistName.includes(formattedArtistQuery) : true;

            return songMatches && artistMatches;
        });

        if (filteredHits.length > 0) {
            // Find the song with the highest pyongs_count from filtered results. Songs that are most popular tend to have a higer count.
            let topSong = filteredHits.reduce((max, current) => {
                return current.result.pyongs_count > max.result.pyongs_count ? current : max;
            });

            const hit = topSong.result; // The song with the highest pyongs_count

            // Display song info
            const songTitle = hit.title_with_featured;
            const artist = hit.primary_artist.name;
            const releaseDate = hit.release_date_for_display;
            const albumCover = hit.song_art_image_url; // Album cover image !!Confirm with Paddy
            const songId = hit.id; // Get the song ID for fetching lyrics

            // Update HTML with song data
            document.getElementById('song-title').innerText = songTitle;
            document.getElementById('artist-name').innerText = `Artist: ${artist}`;
            document.getElementById('release-date').innerText = `Release Date: ${releaseDate}`;
            document.getElementById('album-cover').src = albumCover;

            // Show the song info section
            songInfoContainer.style.display = 'block';

            // Fetch and display song lyrics
            fetchSongLyrics(songId);
            lyricsContainer.style.display = 'block';

        } else {
            document.getElementById('lyrics-content').innerText = 'No song results found';
        }
    } else {
        document.getElementById('lyrics-content').innerText = 'No song results found';
    }
}

//Modal open with lyric content displayed
document.getElementById("toggle-lyrics").addEventListener("click", function () {
    const lyricsContent = document.getElementById('lyrics-content').innerHTML;
    const songTitle =  document.getElementById('song-title').innerText;

    // Insert song name and lyric into modal header and body
    document.getElementById('lyricsModalLabel').innerText = `Lyrics for ${songTitle}`;
    document.getElementById('lyricsModalBody').innerHTML = lyricsContent;

    // Bootstrap method to show modal
    const lyricsModal = new bootstrap.Modal(document.getElementById('lyricsModal'));
    lyricsModal.show();
    console.log(lyricsContent);
});

// Toggle artist serach input visibility
document.getElementById("toggle-artist-query").addEventListener("click", function () {
    const artistSearchToggle = document.getElementById("toggle-artist-query");
    const artistSearchInput = document.getElementById('artist-input');
    artistSearchToggle.classList.toggle("d-none"); //Hides element when box is checked
    artistSearchInput.classList.toggle("d-none"); //Displays searchbar when box is checked
});

//Youtube API

// API Details
const apiKey2 = config.apiKey2;
const apiHost2 = config.apiHost2;

// Asynchronous Function to search YouTube for videos based on user input
async function searchVideos() {
    const query = document.getElementById('search-input').value;

    const API_STRING =
        // encodeURIComponent used here to replace spaces in user query with corresponding URL safe character
        `${apiHost2}?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&key=${apiKey2}`;

    const response = await fetch(API_STRING);
    //Convert API data to a usuable format - JSON
    const data = await response.json();
    console.log(data.items);
    displayVideos(data.items);
}

// Function to display video search results
function displayVideos(e) {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = ''; // Clear previous query results

    //Loop through new results and create div element including html
    e.forEach(video => {
        const videoId = video.id.videoId;
        const videoCard = document.createElement('div');
        videoCard.classList.add('col-12');
        //Create bootstrap card component and import video data
        videoCard.innerHTML = `
                    <div class = "card mb-1" style="max-width: 80%; width: 80%;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${video.snippet.thumbnails.medium.url}" class="img-fluid rounded-start" alt="${video.snippet.title}" height="100%" width="100%">
                            </div>
                            <div class="col-md-7">
                                <div class="card-body">
                                    <h6 class="card-title">${video.snippet.title}</h6>
                                    <p class="card-text">${video.snippet.description.substring(0, 200)}...</p>                                   
                                </div>
                            </div>
                            <div class="col-md-1 d-flex justify-content-center align-items-center playbutton-bg">
                                <a href="javascript:void(0)" onclick="openModal('${videoId}')">Play</a>
                            </div>
                        </div>
                    </div>
                `;
        videoList.appendChild(videoCard); //adds above div element within 'videoList' div
    });
}

// Function to open the Bootstrap modal and play the selected video
function openModal(videoId) {
    const videoIframe = document.getElementById('videoIframe');

    // Set the iframe src to the YouTube URL
    videoIframe.src = `https://www.youtube.com/embed/${videoId}`;

    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('videoModal'));
    modal.show();
}

window.openModal = openModal;

// Clear iframe src when modal is closed to stop video playback
document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById('videoIframe').src = '';
});

document.getElementById("show-lyrics").addEventListener('click', function () {
    const lyricsContainer = document.getElementById("video-lyrics");
    const lyricsContent = document.getElementById('lyrics-content').innerHTML;

    lyricsContainer.innerHTML = lyricsContent;
    lyricsContainer.classList.toggle("d-none")

    // Toggle text of button
    if (this.innerText === "Show Lyrics") {
        this.innerText = "Hide Lyrics";
    } else {
        this.innerText = "Show Lyrics";
    }
}
)
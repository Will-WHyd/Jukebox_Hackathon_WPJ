
    //GENIUS LYRICS API
    
    import config from './config.js'; // Import configuration

    // API Details
    const apiKey1 = config.apiKey1;
    const apiHost1 = config.apiHost1;

    // Event listener for the search button click
    document.getElementById('search-btn').addEventListener('click', function () {
        const songQuery = document.getElementById('search-input').value;
        const artistQuery = document.getElementById('artist-input').value; // Get artist input
        
        if (songQuery) {
            searchSong(songQuery, artistQuery);            
        }
    });

    // Function to search for songs
    async function searchSong(songQuery, artistQuery) {
    //RapidAPI code snippet for Genius API
        const url = `https://${apiHost1}/search/?q=${songQuery}&per_page=10&page=1`; 
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

    // Function to fetch song lyrics by song ID
    //RapidAPI code snippet for Genius API - Song Lyric Search
    async function fetch1SongLyrics(songId) {
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
            console.log("Lyrics data:", data); //Logs results for review in debugger
        } catch (error) {
            console.error(error);
        }
    }

        // Function to display search results
        function displayResults(data, songQuery, artistQuery) {
            const songInfoDiv = document.getElementById('song-info');
            const lyricsDiv = document.getElementById('lyrics');
    
            // Hide all sections initially
            songInfoDiv.style.display = 'none';
            lyricsDiv.style.display = 'none';
    
            if (data.hits && data.hits.length > 0) {
                // Normalize queries to make them more lenient
                const normalizedSongQuery = normalizeString(songQuery);
                const normalizedArtistQuery = artistQuery ? normalizeString(artistQuery) : ''; // Optional
    
                // Filter results based on the song title and artist name if provided
                const filteredHits = data.hits.filter(hit => {
                    const songTitle = normalizeString(hit.result.title_with_featured);
                    const artistName = normalizeString(hit.result.primary_artist.name);
    
                    // Check if the song matches and, if an artist is provided, it also matches the artist
                    const songMatches = songTitle.includes(normalizedSongQuery);
                    const artistMatches = artistQuery ? artistName.includes(normalizedArtistQuery) : true;
    
                    return songMatches && artistMatches;
                });
    
                if (filteredHits.length > 0) {
                    // Find the song with the highest pyongs_count from filtered results
                    let topSong = filteredHits.reduce((max, current) => {
                        return current.result.pyongs_count > max.result.pyongs_count ? current : max;
                    });
    
                    const hit = topSong.result; // The song with the highest pyongs_count
    
                    // Display song info
                    const songTitle = hit.title_with_featured;
                    const artist = hit.primary_artist.name;
                    const releaseDate = hit.release_date_for_display;
                    const albumCover = hit.song_art_image_url; // Album cover image
                    const songId = hit.id; // Get the song ID for fetching lyrics
    
                    // Update HTML with song data
                    document.getElementById('song-title').innerText = songTitle;
                    document.getElementById('artist-name').innerText = `Artist: ${artist}`;
                    document.getElementById('release-date').innerText = `Release Date: ${releaseDate}`;
                    document.getElementById('album-cover').src = albumCover;
    
                    // Show the song info section
                    songInfoDiv.style.display = 'block';
    
                    // Fetch and display song lyrics
                    fetchSongLyrics(songId);
                    lyricsDiv.style.display = 'block';
    
                } else {
                    document.getElementById('lyrics-content').innerText = 'No song results found';
                }
            } else {
                document.getElementById('lyrics-content').innerText = 'No song results found';
            }
        }



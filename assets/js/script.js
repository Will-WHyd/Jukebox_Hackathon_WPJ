
    //GENIUS LYRICS API
    
    // API Details
    const apiKey = ''; // API Key to go here
    const apiHost = 'genius-song-lyrics1.p.rapidapi.com';

    // Event listener for search button - !!Confirm with Paddy that elements are using correct IDs 
    document.getElementById('search-btn').addEventListener('click', function () {
        const songQuery = document.getElementById('search-input').value; // Get user song query
        
        // Check if song query exists
        if (songQuery) {
            searchSong(songQuery); // Call function to search for songs
        }
    });

    // Function to search for songs
    async function searchSong(songQuery) {
    //RapidAPI code snippet for Genius API
        const url = `https://${apiHost}/search/?q=${songQuery}&per_page=10&page=1`; 
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json(); //Parse result data to JSON
            console.log("Song Data:", data); //Logs results for review in debugger
            displayResults(data);
        } catch (error) {
            console.error(error);
        }
          
    }

    // Function to fetch song lyrics by song ID
    //RapidAPI code snippet for Genius API - Song Lyric Search
    async function fetch1SongLyrics(songId) {
        const url = `https://${apiHost}/song/lyrics/?id=${songId}`; // Construct the API URL here
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': apiHost
            }
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json(); //Parse result data to JSON
            console.log("Lyrics data:", data); //Logs results for review in debugger
        } catch (error) {
            console.error(error);
        }
    }

    // Function to display search results
    function displayResults(data) {
    }



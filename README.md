
# Jukebox Hackathon Project

Jukebox is a site that aims to give music lovers a useful resource for finding information about their favorite songs. The site is targeted to fans of music who want immediate access to song lyrics, atist details, and music videos. Jukebox will be useful to anyone who wants a one-stop resource for lyrics and videos. 

Developed by William Waldron-Hyden, Patrick Ryan, and Jack Brosnan

![Initial balsamiq wireframe](image.png)

## Features
# Existing features
- __Hero Image & Music Search Bar__
  - Featured in the hero image front and center, users can type in a song name that they want more information about. 
  - This input is connected to two APIs which will fetch two types of information which create site interactivity in the features outlined below. 
  - The hero image holds this search bar, catching the user's eye and calling them to action as soon as they see the screen. 

- __Song Info & Lyrics Section__
  - Below the search bar, a song info section will populate based on the user input. 
  - Using the Genius API, information such as song name, artist, release date, and album art will appear here.
  - This section includes an expandable card that holds the lyrics for the selected song. 
  - This section is fully responsive and provides a readable, enjoyable display on multiple devices. 

- __Music Video Section__
  - Below the lyrics section, a music video section will populate based on the same user input. 
  - Using the Youtube API, search results of music videos matching the user request will populate.
  - Clicking on a video causes a modal to appear which contains the video for viewing. 
  - A series of radio button toggles will allow for search refinement, so users can search for live shows, instrumentals, and other alternative forms,


### Features left to Implement
- __User Account Login__
  - User can log in to their personal account with the login button at the top of the screen. 
  - Currently there is no database implementation so this is a pseudo login with a single user, to demonstrate proof of concept. 

  - __User Account - Favorite songs__
  - While logged in, the user has the option to 'favorite' a song in the Song Info section. 
  - This sends the song info into an array, and the results of this can be viewed in a modal/popout section.
  - User can click on a song option, which will update the Search Bar input and populate the results in the Info/Video section.
  - Due to no database implementation, favorites are lost on refresh. Proof of concept.  

## Testing

### Validator testing

### Unfixed Bugs

## Deployment

## Credits

### Content

### Media
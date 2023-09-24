# kenjo-challenge-backend
-Changed localhost to 0.0.0.0 to run server.
-Changed Promise in delete to try catch sttement to mantain uniformity.
-Created findById function to use for the get route of the update pipeline.
-Created Update function, creating a get route to be able to populate the update form in the front end, 
then a put route which updates with the modified data.
-Created scoreAlbum function, which pushes a score into an array of ratings, then sets the score with the average of said array.
-Created filterByGenre function, to call in buttons in front end.
-CreatedFilterAlbum function, which matches string to album, returning array of matches.


# album-collection-challenge_front

-Updated to Angular cli and Angular core 13 to run app.
-Created Rating component and added it to mat-card in albumList.
-Created searchbar to filter albums, with keyPress and keyDown handle functions to deal with backspace and typing.
-Created UpdateAlbumDialog and its functions.
-Created filterByGenre buttons and its functions to change albumList depending on query.
-Changed styles to be more appealing and uniform, used display grid for album cards.
-Added genre dropdown to newAlbumDialog and Update AlbumDialog.


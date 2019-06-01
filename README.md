# GIFTastic

## Instructions
1. Choose any search button at the top of the page to load animated GIF images searching on that term.
2. Images load as static images.  Click on any one to begin playing the GIF; click again to stop.
3. To add any search term, enter the term in the input box to the right and click "Add Topic" button.  Duplicate search items are ignored.
4. To load more images, there is an "Add More" button at the bottom that will seach additional images and add them.

## Technical Notes
1. Uses GIPHY.com API to return animated GIF images based on the selected search term.
2. When adding additional GIF, uses indexed search to return additional images.  Also continues to add images from column after the final image was placed.
3. New topic is prevented from being a duplicate.
4. Border changes to GREEN for a GIF that is playing, returns to WHITE when it is stopped (BLUE on hover).
5. Uses a sticky header so the search buttons stay on top
6. Uses Bootstrap and JQuery technologies



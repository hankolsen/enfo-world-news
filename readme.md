#Enfo World News
An experiment trying to create some kind of a PWA using plain vanilla javascript. The app loads a list of news articles
from an external API and renders the result.

* Tested in Chrome, Firefox and Edge.
* Uses service-worker to cache static content.
* Lazy loading images.

###Lighthouse score
Since some images are loaded from an external source I can't get performance much higher, unfortunately.  
![Light house score 100, 94, 100, 100](lighthouse_score.png "Light house score 100, 94, 100, 100")

###Development setup
There are a few (optional) npm develeopment dependencies, just for eslint and to create a local http dev server. 

Run `npm install` to install the dependencies.

Start the http server with `npm start`.

###Future improvements
* Inline critical css styles
* Uglify css and js
* Gulp build process
* Auto-complete suggestions for the search field
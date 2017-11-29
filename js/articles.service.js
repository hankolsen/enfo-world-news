const ArticlesService = {
  /**
   * Articles cache
   */
  _articles: [],

  /**
   * Function to get a list of articles from an API
   * Returns a Promise that will resolve once the articles have arrived
   */
  getArticles: (searchText = '') => {
    // The URL to the source for the articles
    const newsApiUrl = 'https://s3.eu-west-2.amazonaws.com/enfo-test-resources/api/articles.json';

    return new Promise((resolve, reject) => {
      /**
       * If we have stored previously fetched articles in the cache, and the user is doing a search,
       * let's not bother to ask the server again, and re-use the already cached articles.
       * This way we mimick a search/filter service a la an Angular list view
       */
      if (ArticlesService._articles.length && searchText) {
        console.log('Using cache for search');
        // Filter the data according to the searchtext
        let articles = ArticlesService._articles;
        articles = articles.filter(article =>
          article.title.toLowerCase().includes(searchText.toLowerCase()) ||
          article.description.toLowerCase().includes(searchText.toLocaleLowerCase()));
        resolve(articles);
      } else {
        console.log('Querying the API');
        // Try to fetch articles from the API
        fetch(newsApiUrl)
          .then(response => response.json())
          .then((data) => {
            let { articles } = data;

            // Cache the articles, for the reason explained above
            // ArticlesService._articles = articles;

            // We might end up here if this is the first time we query the API so nothing is yet in the cache.
            // If the user somehow has added a search text we need to handle that here too.
            if (searchText) {
              // Filter the data according to the searchtext
              articles = articles.filter(article =>
                article.title.toLowerCase().includes(searchText.toLowerCase()) ||
                article.description.toLowerCase().includes(searchText.toLocaleLowerCase()));
            }

            resolve(articles);
          })
          .catch((error) => {
            // Handle the error here in the api service for the developer
            console.log(`Error fetching articles ${error}`);
            // Reject the promise so the UI can handle the error and tell the user in a nice way
            reject(error);
          });
      }
    });
  },
};

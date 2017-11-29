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

        // Get the cached articles
        let articles = ArticlesService._articles;

        // Filter the articles according to the search text, try to match on both title and description
        articles = ArticlesService.filterArticles({ articles, searchText });

        // Resolve the matching articles
        resolve(articles);

      } else {

        // Try to fetch articles from the API
        fetch(newsApiUrl)
          .then(response => response.json())
          .then((data) => {
            // Get the articles from the response data
            let { articles } = data;

            // Cache the articles, for the reason explained above
            ArticlesService._articles = articles;

            // We might end up here if this is the first time we query the API so nothing is yet in the cache.
            // If the user somehow has added a search text we need to handle that here too.
            if (searchText) {
              // Filter the data according to the searchtext
              articles = ArticlesService.filterArticles({ articles, searchText });
            }

            // Resolve the matching articles
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

  /**
   * Filter the articles according to the search text, try to match on both title and description
   * @param articles
   * @param searchText
   */
  filterArticles: ({ articles, searchText }) =>
    articles.filter(article =>
      article.title.toLowerCase().includes(searchText.toLowerCase()) ||
      article.description.toLowerCase().includes(searchText.toLocaleLowerCase()),
    ),
};

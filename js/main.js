/* global ArticleRenderer ArticlesService ImageLoader:true */
(function () {


  /**
   * Render a list of articles
   */
  const renderArticles = (articles) => {

    // Get the list element that may or may not contain article elementss
    const listElement = document.querySelector('.articles__list');

    // Remove any existing articles elements in the list element
    while (listElement.hasChildNodes()) {
      listElement.removeChild(listElement.lastChild);
    }

    listElement.classList.remove('empty');

    // Create article elements of each article received and attach them to the list element
    articles.forEach((article) => {
      listElement.appendChild(ArticleRenderer.renderArticle(article));
    });

    // Lazy load the images in the articles
    ImageLoader.load();

  };


  /**
   * Fetch articles and render them once received
   */
  const getArticles = (searchText = '') => {

    // Call the API to get the articles
    ArticlesService.getArticles(searchText)
      // If successful, render the articles on the screen
      .then(articles => renderArticles(articles))
      // Show a friendly error message to the user with a modal or something
      .catch(errorMsg => console.log(errorMsg));

  };


  /**
   * Setup the search form and it's event listener(s)
   */
  const setupSearchForm = () => {

    const searchForm = document.querySelector('.search__form');
    const searchField = document.querySelector('.search__field');

    // Check for when the user submits the form, should probably not be needed since we are listening
    // for keyboar events below, but just for the sake of it...
    searchForm.addEventListener('submit', ((e) => {
      e.preventDefault();
      // Get the search text from the search field
      const searchText = searchField.value;
      // Fetch articles with the search text as filter criteria
      getArticles(searchText);
    }));

    // Check for user keyboard interactions
    searchField.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Escape':
          // On Escape we clear the search field and reload the articles without any search text
          searchField.value = '';
          getArticles();
          break;
        default:
          // On any other keyboard input do a search of the articles
          getArticles(searchField.value);
          break;
      }
    });

  };

  /**
   * The initialization code
   * Will setup the search form and load the latest articles
   */
  const init = () => {
    setupSearchForm();
    getArticles();
  };

  // Initialize the app
  init();

})();

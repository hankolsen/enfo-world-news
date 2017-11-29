/* global ArticleRenderer ArticlesService:true */
(function () {
  /**
   * Render a list of articles
   */
  const renderArticles = (articles) => {
    const listElement = document.querySelector('.articles__list');
    while (listElement.hasChildNodes()) {
      listElement.removeChild(listElement.lastChild);
    }
    articles.forEach((article) => {
      listElement.appendChild(ArticleRenderer.renderArticle(article));
    });
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

    searchForm.addEventListener('submit', ((e) => {
      e.preventDefault();
      // Get the search text from the search field
      const searchText = searchField.value;
      // Fetch articles with the search text as filter criteria
      getArticles(searchText);
    }));

    searchField.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'Escape':
          searchField.value = '';
          getArticles();
          break;
        default:
          getArticles(searchField.value);
          break;
      }
    });
  };

  const init = () => {
    setupSearchForm();
    getArticles();
  };

  init();
})();

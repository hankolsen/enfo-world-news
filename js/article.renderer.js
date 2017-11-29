const ArticleRenderer = {

  /**
   * Main method to render an article list element from an article json object
   * @param article
   * @returns {Element}
   */
  renderArticle: (article) => {
    // Create a list item and add classes for styling. Add loading class for fancy animations
    const listItem = document.createElement('li');
    listItem.classList.add('article');
    listItem.classList.add('loading');

    // Add an image with a link at the top
    listItem.appendChild(ArticleRenderer._createImageWithLink(article));

    // Create a div to hold the heading and paragraph of the article
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('article__text-section');
    textWrapper.appendChild(ArticleRenderer._createArticleHeader(article));
    textWrapper.appendChild(ArticleRenderer._createArticleDescription(article));
    listItem.appendChild(textWrapper);

    return listItem;
  },

  /**
   * Helper to create an image wrapped in an link
   * @param url
   * @param urlToImage
   * @param title
   * @returns {Element}
   * @private
   */
  _createImageWithLink: ({ url, urlToImage, title }) => {
    // Create the link element with class and url
    const imageLink = document.createElement('a');
    imageLink.classList.add('article__image-link');
    imageLink.href = url;

    // Create the image and add an alt text
    const image = document.createElement('img');
    image.classList.add('article__image');
    image.src = urlToImage;
    image.alt = title;

    // Create an event listener so we know when the image has been downloaded by the browser
    // When that happens we remove the loading class to enable some css animations
    image.addEventListener('load', () => {
      // Closest is not supported by Edge according to caniuse.com, however testing shows it is working...
      image.closest('.article').classList.remove('loading');
    });

    // Add a wrapper around the image so we can add a dummy loading image while waiting for the real image
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('article__image-wrapper');
    imageWrapper.appendChild(image);

    imageLink.appendChild(imageWrapper);

    return imageLink;
  },


  /**
   * Helper to create the header with a link
   * @param title
   * @param url
   * @returns {Element}
   * @private
   */
  _createArticleHeader: ({ title, url }) => {
    // Create an h2 for the article title
    const articleHeader = document.createElement('h2');
    articleHeader.classList.add('article__header');

    // Create a link to add as the content of the h2
    const headerLink = document.createElement('a');
    headerLink.classList.add('article__header-link');
    headerLink.href = url;
    headerLink.innerHTML = title;

    articleHeader.appendChild(headerLink);

    return articleHeader;
  },

  /**
   * Helper to create the description section of the article
   * @param description
   * @returns {Element}
   * @private
   */
  _createArticleDescription: ({ description }) => {
    // Create a simple paragraph with the article description in it
    const paragraph = document.createElement('p');
    paragraph.classList.add('article__description');
    paragraph.innerHTML = description;

    return paragraph;
  },
};

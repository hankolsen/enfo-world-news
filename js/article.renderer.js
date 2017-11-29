const ArticleRenderer = {
  renderArticle: (article) => {
    const listItem = document.createElement('li');
    listItem.classList.add('article');

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('article__text-section');

    listItem.appendChild(ArticleRenderer._createImageWithLink(article));

    textWrapper.appendChild(ArticleRenderer._createArticleHeader(article));
    textWrapper.appendChild(ArticleRenderer._createArticleDescription(article));

    listItem.appendChild(textWrapper);
    return listItem;
  },

  _createImageWithLink: ({ url, urlToImage, title }) => {
    const imageLink = document.createElement('a');
    imageLink.classList.add('article__image-link');
    imageLink.href = url;

    const image = document.createElement('img');
    image.classList.add('article__image');
    image.classList.add('loading');
    image.src = urlToImage;
    image.alt = title;

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('article__image-wrapper');

    imageWrapper.appendChild(image);

    imageLink.appendChild(imageWrapper);

    return imageLink;
  },


  _createArticleHeader: ({ title, url }) => {
    const articleHeader = document.createElement('h2');
    articleHeader.classList.add('article__header');

    const headerLink = document.createElement('a');
    headerLink.classList.add('article__header-link');
    headerLink.href = url;
    headerLink.innerHTML = title;

    articleHeader.appendChild(headerLink);

    return articleHeader;
  },

  _createArticleDescription: ({ description }) => {
    const paragraph = document.createElement('p');
    paragraph.classList.add('article__description');
    paragraph.innerHTML = description;

    return paragraph;
  },
};

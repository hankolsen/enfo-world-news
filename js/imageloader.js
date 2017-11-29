/* global IntersectionObserver Image:true */

const ImageLoader = {

  load: () => {
    // Grab all our lazy loadable images
    const images = document.querySelectorAll('.js-lazy-image');

    // Make sure that the browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // No support, so we need to load all the images directly
      images.forEach(image => ImageLoader._preloadImage(image));
    } else {
      // Let's set up an observer!
      let observer;

      const onIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            ImageLoader._preloadImage(entry.target);
          }
        });
      };

      const config = {
        rootMargin: '50px 0px',
        threshold: 0.01,
      };

      observer = new IntersectionObserver(onIntersection, config);

      images.forEach((image) => {
        observer.observe(image);
      });

    }
  },

  _preloadImage: (image) => {
    const { src } = image.dataset;

    if (!src) {
      return undefined;
    }

    return ImageLoader._fetchImage(src).then(() => { image.src = src; });
  },


  _fetchImage: url => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  }),

};

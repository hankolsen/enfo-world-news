/* global IntersectionObserver Image:true */
const ImageLoader = (function () {

  const _fetchImage = url => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = resolve;
    image.onerror = reject;
  });


  const _preloadImage = (image) => {
    const { src } = image.dataset;

    if (!src) {
      return undefined;
    }

    return _fetchImage(src).then(() => { image.src = src; });
  };


  const load = () => {
    // Grab all our lazy loadable images
    const images = document.querySelectorAll('.js-lazy-image');

    // Make sure that the browser supports Intersection Observer
    if (!('IntersectionObserver' in window)) {
      // No support, so we need to load all the images directly
      images.forEach(image => _preloadImage(image));
    } else {
      // Let's set up an observer!
      let observer;

      const onIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            _preloadImage(entry.target);
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
  };


  return {
    load,
  };

})();


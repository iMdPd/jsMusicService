export const select = {
  containerOf: {
    pages: '#pages',
    home: '.home-wrapper',
    songPlayer: '.song-player',
  },
  templateOf: {
    homePage: '#template-home-page',
  },
  nav: {
    links: '.main-nav a',
  },
};

export const classList = {
  navLink: {
    active: 'active',
  },
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3132' : ''),
    songs: 'songs',
  },
};

export const templates = {
  homePage: Handlebars.compile(
    document.querySelector(select.templateOf.homePage).innerHTML
  ),
};

export const select = {
  containerOf: {
    pages: '#pages',
    homePage: '.home-wrapper',
    searchPage: '.search-wrapper',
    songPlayer: '.song-player',
  },
  templateOf: {
    songWrapper: '#template-song-wrapper',
    subscribe: '#template-subscribe',
    searchPage: '#template-search-page',
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
  songWrapper: Handlebars.compile(
    document.querySelector(select.templateOf.songWrapper).innerHTML
  ),

  subscribe: Handlebars.compile(
    document.querySelector(select.templateOf.subscribe).innerHTML
  ),

  searchPage: Handlebars.compile(
    document.querySelector(select.templateOf.searchPage).innerHTML
  ),
};

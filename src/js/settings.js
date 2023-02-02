export const select = {
  containerOf: {
    pages: '#pages',
    homePage: '.home-wrapper',
    searchPage: '.search-wrapper',
    discoverPage: '.discover-wrapper',
    subscribe: '.subscribe__wrapper',
    songs: '.song-container',
    songPlayer: '.song-player',
  },
  templateOf: {
    songWrapper: '#template-song-wrapper',
    subscribe: '#template-subscribe',
    searchPage: '#template-search-page',
    discoverPage: '#template-discover-page',
  },
  nav: {
    links: '.main-nav a',
    searchLink: '[href="#search"',
  },
  subscribe: {
    link: '.button-box a',
  },
  searchPage: {
    button: '.btn',
    input: '.form-control',
    alerts: '.search-wrapper p',
    songsContainer: '.search-wrapper .song-container',
    songsCounter: '.songs-counter',
  },
};

export const classList = {
  active: 'active',
  hidden: 'hidden',
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

  discoverPage: Handlebars.compile(
    document.querySelector(select.templateOf.discoverPage).innerHTML
  ),
};

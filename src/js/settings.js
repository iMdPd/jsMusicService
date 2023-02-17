export const select = {
  containerOf: {
    pages: '#pages',
    homePage: '.home-wrapper',
    searchPage: '.search-wrapper',
    discoverPage: '.discover-wrapper',
    subscribe: '.subscribe__wrapper',
    songs: '.song-container',
    songPlayer: '.song-player',
    categories: '.categories span',
    noResultAlert: '.no-result',
    categoriesList: 'categories-list',
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
    discoverLink: '[href="#discover"',
  },
  subscribe: {
    link: '.button-box a',
  },
  homePage: {
    songPlayer: '.home-wrapper .song-player',
  },
  searchPage: {
    button: '.btn',
    input: '.form-control',
    select: '.form-select',
    alerts: '.search-wrapper p',
    songsContainer: '.search-wrapper .song-container',
    songPlayer: '.search-wrapper .song-player',
    songsCounter: '.songs-counter',
  },
  discoverPage: {
    songsContainer: '.discover-wrapper .song-container',
    songWrapper: '.discover-wrapper .song-wrapper',
    songPlayer: '.discover-wrapper .song-player',
  },
};

export const classList = {
  active: 'active',
  hidden: 'hidden',
  selected: 'selected',
  uppercase: '.uppercase',
};

export const settings = {
  db: {
    url:
      '//' +
      window.location.hostname +
      (window.location.hostname == 'localhost' ? ':3131' : ''),
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

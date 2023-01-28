import { select, classList, settings } from '../js/settings.js';
import Song from './components/Song.js';
import Subscribe from './components/Subscribe.js';

const app = {
  initPages: function () {
    const thisApp = this;

    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);

    const idFromHash = window.location.hash.replace('#/', '');

    let pageMatchingHash = thisApp.pages[0].id;

    for (let page of thisApp.pages) {
      if (page.id === idFromHash) {
        pageMatchingHash = page.id;
        break;
      }
    }

    thisApp.activePage(pageMatchingHash);
    // console.log(pageMatchingHash);

    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const clickedElement = this;

        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activePage(id);

        window.location.hash = '#/' + id;
      });
    }
  },

  activePage: function (pageId) {
    const thisApp = this;

    /*toggle class "active" to matching pages, remove form non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classList.navLink.active, page.id == pageId);
    }
    /*toggle class "active" to matching links, remove form non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classList.navLink.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;
    // console.log(url);

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        parsedResponse.sort((a, b) => {
          return a.ranking - b.ranking;
        });
        thisApp.data.songs = parsedResponse;

        thisApp.initSong();
        thisApp.initMusicPlayerWidget();
      });
  },

  initSong: function () {
    const thisApp = this;

    for (let songData in thisApp.data.songs) {
      new Song(thisApp.data.songs[songData]);
    }

    thisApp.subscribeLink = document.querySelector('.button-box a');
    console.log('subscribeLink', thisApp.subscribeLink);

    thisApp.subscribeLink.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedElement = this;

      console.log(clickedElement);
      const id = clickedElement.getAttribute('href').replace('#', '');

      /* run thisApp.activatePage with that id */
      thisApp.activePage(id);

      /* change url # */
      window.location.hash = '#/' + id;
    });
  },

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: select.containerOf.songPlayer,
      stopOthersOnPlay: true,
    });
  },

  initSubscribe: function () {
    const subscribeWrapper = document.querySelector('.subscribe__wrapper');

    new Subscribe(subscribeWrapper);
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');

    thisApp.initPages();
    thisApp.initData();
    thisApp.initSubscribe();
  },
};

app.init();

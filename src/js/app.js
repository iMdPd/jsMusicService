import { select, classList, settings } from '../js/settings.js';
import Home from '../js/components/Home.js';
import SongWidget from './components/SongWidget.js';

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

  initData: function () {
    const thisApp = this;

    thisApp.data = {};

    const url = settings.db.url + '/' + settings.db.songs;
    console.log(url);

    fetch(url)
      .then(function (rawResponse) {
        return rawResponse.json();
      })
      .then(function (parsedResponse) {
        thisApp.data.songs = parsedResponse;

        thisApp.initMusicPlayer();
      });
  },

  initMusicPlayer: function () {
    const thisApp = this;

    for (let songData in thisApp.data.songs)
      new SongWidget(thisApp.data.songs[songData]);
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

  initHome: function () {
    const homeContainer = document.querySelector(select.containerOf.home);

    new Home(homeContainer);
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');

    thisApp.initPages();
    thisApp.initData();
    thisApp.initHome();
  },
};

app.init();

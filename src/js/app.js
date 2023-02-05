import { select, classList, settings } from '../js/settings.js';
import { Songs } from './components/Songs.js';
import { Subscribe } from './components/Subscribe.js';
import { Search } from './components/Search.js';
import { Discover } from './components/Discover.js';

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
        thisApp.activeLink(clickedElement);
      });
    }
  },

  activeLink: function (clickedElement) {
    const thisApp = this;

    const id = clickedElement.getAttribute('href').replace('#', '');

    thisApp.activePage(id);

    window.location.hash = '#/' + id;
  },

  activePage: function (pageId) {
    const thisApp = this;

    /*toggle class "active" to matching pages, remove form non-matching */
    for (let page of thisApp.pages) {
      page.classList.toggle(classList.active, page.id == pageId);
    }
    /*toggle class "active" to matching links, remove form non-matching */
    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classList.active,
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
        thisApp.initSearchPage();
        thisApp.initDiscoverPage();
        thisApp.initSong();
        thisApp.mostListenedSongs();
      });
  },

  initSong: function () {
    const thisApp = this;

    new Songs(thisApp.data.songs);
  },

  mostListenedSongs() {
    const thisApp = this;
    const allAudios = document.getElementsByTagName('audio');

    let listenedSongs = {};

    for (let audio of allAudios) {
      audio.addEventListener('play', function () {
        const listenedAudio = this;

        const categoriesOfListenedAudio =
          listenedAudio.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerHTML
            .replace('Categories:', '')
            .trim()
            .slice(0, -1)
            .split(',  ');

        for (let category of categoriesOfListenedAudio) {
          if (!listenedSongs[category]) {
            listenedSongs[category] = 1;
          } else {
            listenedSongs[category]++;
          }
        }
        console.log(listenedSongs);

        const getMax = (object) => {
          let max = Math.max(...Object.values(object));
          return Object.keys(object).filter((key) => object[key] == max);
        };

        const mostLikedCategory = getMax(listenedSongs);
        console.log(mostLikedCategory);

        const matchingSongs = [];

        for (let category of mostLikedCategory) {
          for (let song of thisApp.data.songs) {
            if (song.categories.includes(category)) {
              matchingSongs.push(song);
            }

            console.log(matchingSongs);
          }
        }
      });
    }
  },
  // uppercaseLetters: function () {
  //   const upperCaseWrapper = document.querySelectorAll('.uppercase');

  //   for (let i = 0; i < upperCaseWrapper.length; i++) {
  //     upperCaseWrapper[i].innerHTML =
  //       upperCaseWrapper[i].innerHTML.uppercaseLetters();
  //   }
  // },

  initSubscribe: function () {
    const thisApp = this;
    const subscribeWrapper = document.querySelector(
      select.containerOf.subscribe
    );

    new Subscribe(subscribeWrapper);

    thisApp.subscribeLink = document.querySelector(select.subscribe.link);
    // console.log('subscribeLink', thisApp.subscribeLink);

    thisApp.subscribeLink.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedElement = this;
      thisApp.activeLink(clickedElement);
    });
  },

  initSearchPage: function () {
    const thisApp = this;
    const searchPageWrapper = document.querySelector(
      select.containerOf.searchPage
    );
    new Search(searchPageWrapper, thisApp.data.songs);
  },

  initDiscoverPage() {
    const thisApp = this;

    const discoverPageWrapper = document.querySelector(
      select.containerOf.discoverPage
    );
    new Discover(discoverPageWrapper, thisApp.data.songs);
  },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');

    thisApp.initPages();
    thisApp.initSubscribe();
    thisApp.initData();
    // thisApp.uppercaseLetters();
  },
};

app.init();

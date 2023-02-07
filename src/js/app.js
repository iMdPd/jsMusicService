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
        thisApp.initSearchPage();
        thisApp.mostListenedSongs();
        thisApp.initDiscoverPage();
      });
  },

  initSong: function () {
    const thisApp = this;

    new Songs(thisApp.data.songs);
  },

  mostListenedSongs() {
    const thisApp = this;
    /* select all <audio> elements */
    const allAudios = document.getElementsByTagName('audio');
    /* set globally listenedSongs */
    let listenedSongs = {};
    /* set globally matchingSongs */
    thisApp.matchingSongs = [];

    /* for every audio of allAudios */
    for (let audio of allAudios) {
      /* add event listener 'play' on every audio */
      audio.addEventListener('play', function () {
        const playedAudio = this;

        /* set variable named categoriesOfPlayedAudio and get categories from playedAudio  */
        const categoriesOfPlayedAudio =
          playedAudio.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerHTML
            .replace('Categories:', '')
            .trim()
            .slice(0, -1)
            .split(',  ');

        /* for every category of categoriesOfPlayedAudio */
        for (let category of categoriesOfPlayedAudio) {
          /* if it doesn't exist in listenedSongs object */
          if (!listenedSongs[category]) {
            /* set it's value to 1 */
            listenedSongs[category] = 1;
          } else {
            /* increase it's value by 1 */
            listenedSongs[category]++;
          }
        }

        /* set nev variable with function named getMax and param named object */
        const getMax = (object) => {
          /* select the category with the highest value */
          let max = Math.max(...Object.values(object));
          return Object.keys(object).filter((key) => object[key] == max);
        };

        /* set variable mostLikedCategory witch render most played category */
        const mostLikedCategory = getMax(listenedSongs);

        /* for every loop reset matchingSongs array to 0  */
        thisApp.matchingSongs.length = 0;

        /* for every object named song of array named thisApp.data.songs*/
        for (let song of thisApp.data.songs) {
          /* for every category of array named mostLikedCategory */
          for (let category of mostLikedCategory) {
            if (
              /* song.categories includes category from mostLikedCategory and thisApp.matchingSongs doesn't includes song object */
              song.categories.includes(category) &&
              !thisApp.matchingSongs.includes(song)
            ) {
              /* push this song to thisApp.matchingSongs array */
              thisApp.matchingSongs.push(song);
            }
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

    thisApp.instance = new Discover(
      discoverPageWrapper,
      thisApp.data.songs,
      thisApp.matchingSongs
    );
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

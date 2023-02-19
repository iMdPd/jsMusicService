import { select, classList, settings } from '../js/settings.js';
import { Song } from './components/Song.js';
import { SubscribeSection } from './components/SubscribeSection.js';
import { SearchPage } from './components/SearchPage.js';
import { DiscoverPage } from './components/DiscoverPage.js';

const app = {
  getData: function () {
    const thisApp = this;
    thisApp.matchingSongs = [];

    thisApp.subscribeWrapper = document.querySelector(
      select.containerOf.subscribe
    );
    thisApp.noResultAllert = document.querySelector(
      select.containerOf.noResultAlert
    );
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    thisApp.categoriesList = document.getElementById(
      select.containerOf.categoriesList
    );
    thisApp.homePageContainer = document.querySelector(
      select.containerOf.homePage
    );
    thisApp.searchPageWrapper = document.querySelector(
      select.containerOf.searchPage
    );
    thisApp.discoverPageWrapper = document.querySelector(
      select.containerOf.discoverPage
    );
    thisApp.allAudios = document.getElementsByTagName('audio');
    thisApp.upperCaseWrapper = document.querySelectorAll(classList.uppercase);
  },

  initSubscribeSection: function () {
    const thisApp = this;
    new SubscribeSection(thisApp.subscribeWrapper);
  },

  initPages: function () {
    const thisApp = this,
      idFromHash = window.location.hash.replace('#/', '');

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

    thisApp.subscribeLink = document.querySelector(select.subscribe.link);

    thisApp.subscribeLink.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedElement = this;
      thisApp.activeLink(clickedElement);
    });
  },

  activeLink: function (clickedElement) {
    const thisApp = this,
      id = clickedElement.getAttribute('href').replace('#', '');

    thisApp.activePage(id);

    window.location.hash = '#/' + id;
  },

  activePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classList.active, page.id == pageId);
    }

    for (let link of thisApp.navLinks) {
      link.classList.toggle(
        classList.active,
        link.getAttribute('href') == '#' + pageId
      );
    }
  },

  initData: function () {
    const thisApp = this,
      url = settings.db.url + '/' + settings.db.songs;

    thisApp.data = {};

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
        thisApp.generateListOfCategories();
        thisApp.initSearchPage();
        thisApp.getFavouriteMusicGenres();
        thisApp.initDiscoverPage();
      });
  },

  generateListOfCategories() {
    const thisApp = this,
      musicCategories = [];

    for (let song of thisApp.data.songs) {
      for (let category of song.categories) {
        if (!musicCategories.includes(category)) {
          musicCategories.push(category);
        }
      }
    }

    musicCategories.forEach((genre) => {
      let li = document.createElement('li');
      li.innerText = genre;
      thisApp.categoriesList.appendChild(li);
    });

    thisApp.filterSongsByCategory();
  },

  filterSongsByCategory() {
    const thisApp = this,
      selectedCategories = [];

    thisApp.categoriesList.addEventListener('click', function (event) {
      const clickedCategory = event.target,
        songWrappers = thisApp.homePageContainer.children,
        addCategory = function () {
          selectedCategories.push(clickedCategory.innerHTML);
        },
        removeCategory = function () {
          const removeCategory = selectedCategories.indexOf(
            clickedCategory.innerHTML
          );
          selectedCategories.splice(removeCategory, 1);
        };

      clickedCategory.classList.toggle(classList.selected);

      !selectedCategories.includes(clickedCategory.innerHTML)
        ? addCategory()
        : removeCategory();

      for (let songWrapper of songWrappers) {
        let shouldBeHidden = false;

        const songWrapperCategories = songWrapper.querySelector(
          select.containerOf.categories
        ).innerText;

        for (let category of selectedCategories) {
          if (!songWrapperCategories.includes(category)) {
            shouldBeHidden = true;
            break;
          }
        }

        shouldBeHidden
          ? songWrapper.classList.add(classList.hidden)
          : songWrapper.classList.remove(classList.hidden);
      }
      thisApp.showNoResultAllert();
    });
  },

  showNoResultAllert: function () {
    const thisApp = this,
      songWrappersArray = Array.from(thisApp.homePageContainer.children),
      hasHiddenClass = songWrappersArray.filter((element) =>
        element.classList.contains(classList.hidden)
      );

    if (songWrappersArray.length === hasHiddenClass.length) {
      thisApp.noResultAllert.classList.remove(classList.hidden);
    } else {
      thisApp.noResultAllert.classList.add(classList.hidden);
    }
  },

  initSong: function () {
    const thisApp = this;

    new Song(thisApp.data.songs);
  },

  getFavouriteMusicGenres() {
    const thisApp = this;
    let listenedSongs = {};

    for (let audio of thisApp.allAudios) {
      audio.addEventListener('play', function () {
        const playedAudio = this,
          playedAudioCategories =
            playedAudio.parentElement.parentElement.lastElementChild.firstElementChild.firstElementChild.innerText
              .replace('Categories:', '')
              .trim()
              .slice(0, -1)
              .split(', ');

        for (let category of playedAudioCategories) {
          !listenedSongs[category]
            ? (listenedSongs[category] = 1)
            : listenedSongs[category]++;
        }
        // console.log(listenedSongs);

        const getMaxCategory = (object) => {
          let max = Math.max(...Object.values(object));
          return Object.keys(object).filter((key) => object[key] == max);
        };

        thisApp.favouriteMusicGenres = getMaxCategory(listenedSongs);

        thisApp.getMatchingSongs();
      });
    }
  },

  getMatchingSongs: function () {
    const thisApp = this;
    thisApp.matchingSongs.length = 0;

    for (let song of thisApp.data.songs) {
      for (let category of thisApp.favouriteMusicGenres) {
        if (
          song.categories.includes(category) &&
          !thisApp.matchingSongs.includes(song)
        ) {
          thisApp.matchingSongs.push(song);
        }
      }
    }
  },

  initSearchPage: function () {
    const thisApp = this;

    new SearchPage(thisApp.searchPageWrapper, thisApp.data.songs);
  },

  initDiscoverPage() {
    const thisApp = this;

    thisApp.instance = new DiscoverPage(
      thisApp.discoverPageWrapper,
      thisApp.data.songs,
      thisApp.matchingSongs
    );
  },

  // uppercaseLetters: function () {
  //   const thisApp = this;

  //   for (let i = 0; i < thisApp.upperCaseWrapper.length; i++) {
  //     thisApp.upperCaseWrapper[i].innerHTML =
  //       thisApp.upperCaseWrapper[i].innerHTML.uppercaseLetters();
  //   }
  // },

  init: function () {
    const thisApp = this;
    console.log('*** App starting ***');
    thisApp.getData();
    thisApp.initSubscribeSection();
    thisApp.initPages();
    thisApp.initData();
    // thisApp.uppercaseLetters();
  },
};

app.init();

import { templates, classList, select } from '../settings.js';

export class Search {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.getData(data);
    thisSearch.filterElements();
    thisSearch.setDefaultValues();
    thisSearch.generateCategoryInputList(data);
  }

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.searchPage();

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  setDefaultValues() {
    const thisSearch = this;

    const navSearchLink = document.querySelector(select.nav.searchLink);

    /* logic teaken from https://www.seanmcp.com/articles/event-listener-for-class-change/ */
    function callback(mutationsList) {
      mutationsList.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          for (let alert of thisSearch.alerts) {
            alert.classList.add(classList.hidden);
          }
          thisSearch.songsCounter.classList.add(classList.hidden);
          thisSearch.songsContainer.innerHTML = '';
          thisSearch.input.value = null;
          thisSearch.select.value = thisSearch.select.children[0].value;
        }
      });
    }

    const mutationObserver = new MutationObserver(callback);

    mutationObserver.observe(navSearchLink, { attributes: true });
  }

  getData(data) {
    const thisSearch = this;

    thisSearch.dataSongs = data;

    thisSearch.button = thisSearch.dom.wrapper.querySelector(
      select.searchPage.button
    );
    thisSearch.input = thisSearch.dom.wrapper.querySelector(
      select.searchPage.input
    );
    thisSearch.select = thisSearch.dom.wrapper.querySelector(
      select.searchPage.select
    );

    thisSearch.alerts = document.querySelectorAll(select.searchPage.alerts);
    thisSearch.songsContainer = document.querySelector(
      select.searchPage.songsContainer
    );
    thisSearch.songsCounter = document.querySelector(
      select.searchPage.songsCounter
    );
  }

  filterElements() {
    const thisSearch = this;

    thisSearch.button.addEventListener('click', function () {
      if (
        thisSearch.input.value == '' &&
        thisSearch.select.value == thisSearch.select.children[0].value
      ) {
        const generatedHTML = templates.songWrapper(thisSearch.dataSongs);

        thisSearch.songsContainer.innerHTML = generatedHTML;

        thisSearch.songsCounter.innerHTML =
          'We have found ' + thisSearch.dataSongs.length + ' songs...';
      } else if (
        thisSearch.input.value &&
        thisSearch.select.value == thisSearch.select.children[0].value
      ) {
        const filteredSongs = thisSearch.dataSongs.filter((song) => {
          return (
            song.author
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(thisSearch.input.value.toLowerCase()) ||
            song.title
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(thisSearch.input.value.toLowerCase())
          );
        });

        if (filteredSongs.length == 0) {
          thisSearch.songsContainer.innerHTML = '';

          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' songs...';
        } else {
          if (filteredSongs.length === 1) {
            thisSearch.songsCounter.innerHTML =
              'We have found ' + filteredSongs.length + ' song...';
          } else {
            thisSearch.songsCounter.innerHTML =
              'We have found ' + filteredSongs.length + ' songs...';
          }

          const generatedHTML = templates.songWrapper(filteredSongs);
          thisSearch.songsContainer.innerHTML = generatedHTML;
        }
      } else if (
        !thisSearch.input.value &&
        thisSearch.select.value == thisSearch.select.value
      ) {
        const filteredSongs = [];
        for (let song of thisSearch.dataSongs) {
          if (song.categories.includes(thisSearch.select.value)) {
            filteredSongs.push(song);
          }
        }

        if (filteredSongs.length === 1) {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' song...';
        } else {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' songs...';

          const generatedHTML = templates.songWrapper(filteredSongs);
          thisSearch.songsContainer.innerHTML = generatedHTML;
        }
      } else if (
        thisSearch.input.value &&
        thisSearch.select.value == thisSearch.select.value
      ) {
        const songsFilteredByName = thisSearch.dataSongs.filter((song) => {
          return (
            song.author
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(thisSearch.input.value.toLowerCase()) ||
            song.title
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(thisSearch.input.value.toLowerCase())
          );
        });

        const SongsFilteredByCategory = [];

        for (let song of songsFilteredByName) {
          if (song.categories.includes(thisSearch.select.value)) {
            SongsFilteredByCategory.push(song);
          }
        }

        if (SongsFilteredByCategory.length === 1) {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + SongsFilteredByCategory.length + ' song...';
        } else {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + SongsFilteredByCategory.length + ' songs...';
        }

        const generatedHTML = templates.songWrapper(SongsFilteredByCategory);
        thisSearch.songsContainer.innerHTML = generatedHTML;
      }

      /* first validation without select form */

      // if (!thisSearch.input.value) {
      //   thisSearch.songsCounter.classList.add(classList.hidden);
      //   thisSearch.alerts[1].classList.add(classList.hidden);
      //   thisSearch.songsContainer.innerHTML = '';
      //   thisSearch.alerts[0].classList.remove(classList.hidden);
      // } else {
      //   thisSearch.alerts[0].classList.add(classList.hidden);
      //   const filteredSongs = thisSearch.dataSongs.filter((song) => {
      //     return (
      //       song.author
      //         .toLowerCase()
      //         .replaceAll(' ', '')
      //         .includes(thisSearch.input.value.toLowerCase()) ||
      //       song.title
      //         .toLowerCase()
      //         .replaceAll(' ', '')
      //         .includes(thisSearch.input.value.toLowerCase())
      //     );
      //   });

      //   if (filteredSongs.length == 0) {
      //     thisSearch.songsCounter.classList.add(classList.hidden);
      //     thisSearch.alerts[1].classList.remove(classList.hidden);
      //     thisSearch.songsContainer.innerHTML = '';
      //     thisSearch.input.value = null;
      //   } else {
      //     thisSearch.songsCounter.classList.remove(classList.hidden);
      //     thisSearch.alerts[1].classList.add(classList.hidden);
      //     thisSearch.input.value = null;
      //     if (filteredSongs.length <= 1) {
      //       thisSearch.songsCounter.innerHTML =
      //         'We have found ' + filteredSongs.length + ' song...';
      //     } else {
      //       thisSearch.songsCounter.innerHTML =
      //         'We have found ' + filteredSongs.length + ' songs...';
      //     }

      //     const generatedHTML = templates.songWrapper(filteredSongs);
      //     thisSearch.songsContainer.innerHTML = generatedHTML;
      //   }
      // }
      thisSearch.initMusicPlayerWidget();
    });
  }

  generateCategoryInputList() {
    const thisSearch = this;

    const songsCategories = [];
    thisSearch.categoriesList = document.getElementById(
      'categories-group-select'
    );
    for (let song of thisSearch.dataSongs) {
      for (let category of song.categories) {
        if (!songsCategories.includes(category)) {
          songsCategories.push(category);
        }
      }
    }

    songsCategories.forEach((category) => {
      let opt = document.createElement('option');
      opt.innerText = category;
      thisSearch.categoriesList.appendChild(opt);
    });
  }

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: '.search-wrapper .song-player',
      stopOthersOnPlay: true,
    });
  }
}

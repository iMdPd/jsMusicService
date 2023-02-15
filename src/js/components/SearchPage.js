import { templates, classList, select } from '../settings.js';

export class SearchPage {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.renderPageContent(element);
    thisSearch.getData(data);
    thisSearch.filterElements();
    thisSearch.setDefaultPage();
    thisSearch.generateCategorySelect();
  }

  renderPageContent(element) {
    const thisSearch = this,
      generatedHTML = templates.searchPage();

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  getData(data) {
    const thisSearch = this;

    thisSearch.dataSongs = data;

    thisSearch.navSearchLink = document.querySelector(select.nav.searchLink);

    thisSearch.button = thisSearch.dom.wrapper.querySelector(
      select.searchPage.button
    );
    thisSearch.input = thisSearch.dom.wrapper.querySelector(
      select.searchPage.input
    );
    thisSearch.categorySelector = thisSearch.dom.wrapper.querySelector(
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

  setDefaultPage() {
    const thisSearch = this,
      mutationObserver = new MutationObserver(callback);

    function callback(mutationsList) {
      mutationsList.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          for (let alert of thisSearch.alerts) {
            alert.classList.add(classList.hidden);
          }
          thisSearch.songsCounter.classList.add(classList.hidden);
          thisSearch.songsContainer.innerHTML = '';
          thisSearch.input.value = null;
          thisSearch.categorySelector.value =
            thisSearch.categorySelector.children[0].value;
        }
      });
    }

    mutationObserver.observe(thisSearch.navSearchLink, { attributes: true });
  }

  filterElements() {
    const thisSearch = this;

    thisSearch.button.addEventListener('click', function () {
      // const filters = [
      //   { param: thisSearch.input.value.toLowerCase(), type: 'text' },
      //   { param: thisSearch.categorySelector.value, type: 'category' },
      // ];
      // console.log('filters', filters);

      // function filterSongsByInput(songs, filters) {
      //   function filterByText(param, songs) {
      //     return songs.filter(
      //       (s) =>
      //         s.title.toLowerCase().replaceAll(' ', '').includes(param) ||
      //         s.author.toLowerCase().replaceAll(' ', '').includes(param)
      //     );
      //   }

      //   function filterByCategory(param, songs) {
      //     return songs.filter((s) => s.category === param);
      //   }

      //   const filterBuilder = {
      //     category: filterByCategory,
      //     text: filterByText,
      //   };

      //   return filters.reduce((acc, filter) => {
      //     return filterBuilder[filter.type](filter.param, acc);
      //   }, songs);
      // }

      // const songs = thisSearch.dataSongs;
      // console.log('songs', songs);

      // thisSearch.generateMusicPlayer(filterSongsByInput(songs, filters));
      // thisSearch.displayMatchingSongsNumber(filterSongsByInput(songs, filters));
      // console.log(filterSongsByInput(songs, filters));

      /* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

      if (
        !thisSearch.input.value &&
        thisSearch.categorySelector.value ==
          thisSearch.categorySelector.children[0].value
      ) {
        thisSearch.generateMusicPlayer(thisSearch.dataSongs);
        thisSearch.displayMatchingSongsNumber(thisSearch.dataSongs);
      } else if (
        thisSearch.input.value &&
        thisSearch.categorySelector.value ==
          thisSearch.categorySelector.children[0].value
      ) {
        thisSearch.filterSongsByInput();

        thisSearch.generateMusicPlayer(thisSearch.filteredSongs);
        thisSearch.displayMatchingSongsNumber(thisSearch.filteredSongs);
      } else if (
        !thisSearch.input.value &&
        thisSearch.categorySelector.value !=
          thisSearch.categorySelector.children[0].value
      ) {
        const filteredSongs = [];
        for (let song of thisSearch.dataSongs) {
          if (song.categories.includes(thisSearch.categorySelector.value)) {
            filteredSongs.push(song);
          }
        }
        thisSearch.generateMusicPlayer(filteredSongs);
        thisSearch.displayMatchingSongsNumber(filteredSongs);
      } else if (
        thisSearch.input.value &&
        thisSearch.categorySelector.value !=
          thisSearch.categorySelector.children[0].value
      ) {
        thisSearch.filterSongsByInput();

        const songsFilteredByCategory = [];
        for (let song of thisSearch.filteredSongs) {
          if (song.categories.includes(thisSearch.categorySelector.value)) {
            songsFilteredByCategory.push(song);
          }
        }
        thisSearch.displayMatchingSongsNumber(songsFilteredByCategory);
        thisSearch.generateMusicPlayer(songsFilteredByCategory);
      }

      thisSearch.initMusicPlayerWidget();
    });
  }

  generateMusicPlayer(songList) {
    const thisSearch = this,
      generatedHTML = templates.songWrapper(songList);

    thisSearch.songsContainer.innerHTML = generatedHTML;
    thisSearch.songsCounter.classList.remove(classList.hidden);
  }

  filterSongsByInput() {
    const thisSearch = this;

    thisSearch.filteredSongs = thisSearch.dataSongs.filter((song) => {
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
  }

  generateCategorySelect() {
    const thisSearch = this,
      musicCategories = [];

    for (let song of thisSearch.dataSongs) {
      for (let category of song.categories) {
        if (!musicCategories.includes(category)) {
          musicCategories.push(category);
        }
      }
    }

    musicCategories.forEach((category) => {
      let opt = document.createElement('option');
      opt.innerText = category;
      opt.value = category;
      thisSearch.categorySelector.appendChild(opt);
    });
  }

  displayMatchingSongsNumber(param) {
    const thisSearch = this,
      foundOneSong = function () {
        thisSearch.songsCounter.innerHTML =
          'We have found ' + param.length + ' song...';
      },
      foundMultipleSongs = function () {
        thisSearch.songsCounter.innerHTML =
          'We have found ' + param.length + ' songs...';
      };

    param.length === 1 ? foundOneSong() : foundMultipleSongs();
  }

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: select.searchPage.songPlayer,
      stopOthersOnPlay: true,
    });
  }
}

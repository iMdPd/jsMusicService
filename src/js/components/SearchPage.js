import { templates, classList, select } from '../settings.js';

export class SearchPage {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.getData(data);
    thisSearch.filterElements();
    thisSearch.setDefaultPage();
    thisSearch.generateCategorySelect();
  }

  render(element) {
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
    /* add event listener on button search */
    thisSearch.button.addEventListener('click', function () {
      if (
        /* if name input is empty and category select has set default option */
        thisSearch.input.value == '' &&
        thisSearch.categorySelector.value ==
          thisSearch.categorySelector.children[0].value
      ) {
        thisSearch.generateSongsPlayer(thisSearch.dataSongs);
        /* add song counter */
        thisSearch.songsCounter.innerHTML =
          'We have found ' + thisSearch.dataSongs.length + ' songs...';
      } else if (
        /* if name input has value and category select has set default option  */
        thisSearch.input.value &&
        thisSearch.categorySelector.value ==
          thisSearch.categorySelector.children[0].value
      ) {
        thisSearch.filterSongs();
        /* if filteredSongs array has no contents */
        if (thisSearch.filteredSongs.length == 0) {
          /* remove all content from songsContainer */
          thisSearch.songsContainer.innerHTML = '';
          /* add song counter */
          thisSearch.songsCounter.innerHTML =
            'We have found ' + thisSearch.filteredSongs.length + ' songs...';
        } else {
          thisSearch.generateSongCounterValidation(thisSearch.filteredSongs);

          thisSearch.generateSongsPlayer(thisSearch.filteredSongs);
        }
      } else if (
        /* if name input has no value and category select has chosen option */
        thisSearch.input.value == '' &&
        thisSearch.categorySelector.value !=
          thisSearch.categorySelector.children[0].value
      ) {
        /* set new empty array named filteredSongs */
        const filteredSongs = [];
        /* for each song of songs list */
        for (let song of thisSearch.dataSongs) {
          /* check if song.categories includes option chosen in category select form */
          if (song.categories.includes(thisSearch.categorySelector.value)) {
            /* if it's true push song to filteredSongs array */
            filteredSongs.push(song);
          }
        }

        if (filteredSongs.length == 1) {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' song...';

          thisSearch.generateSongsPlayer(filteredSongs);
        } else {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' songs...';

          thisSearch.generateSongsPlayer(filteredSongs);
        }
      } else if (
        /* if name input has value and category select has chosen option */
        thisSearch.input.value &&
        thisSearch.categorySelector.value !=
          thisSearch.categorySelector.children[0].value
      ) {
        thisSearch.filterSongs();

        /* create empty array named songsFilteredByCategory*/
        const songsFilteredByCategory = [];
        /* for every song of filteredSongs array */
        for (let song of thisSearch.filteredSongs) {
          /* if song.categories includes value form category select form */
          if (song.categories.includes(thisSearch.categorySelector.value)) {
            /* add song to array named songsFilteredByCategory */
            songsFilteredByCategory.push(song);
          }
        }
        thisSearch.generateSongCounterValidation(songsFilteredByCategory);

        thisSearch.generateSongsPlayer(songsFilteredByCategory);
      }

      thisSearch.initMusicPlayerWidget();
    });
  }

  generateSongsPlayer(songList) {
    const thisSearch = this;
    /* based on the song list generate HTML element using template songWrapper */
    const generatedHTML = templates.songWrapper(songList);
    /* set generatedHTML as innerHTML of songsContainer  */
    thisSearch.songsContainer.innerHTML = generatedHTML;
    /* remove class hidden from songCounter  */
    thisSearch.songsCounter.classList.remove(classList.hidden);
  }

  filterSongs() {
    const thisSearch = this;

    /* set array named filteredSongs which filter for each song from songs list */
    thisSearch.filteredSongs = thisSearch.dataSongs.filter((song) => {
      return (
        /* get song.author name and lowercase it, then merge author name */
        song.author
          .toLowerCase()
          .replaceAll(' ', '')
          /* check if song.author name includes input value */
          .includes(thisSearch.input.value.toLowerCase()) ||
        /* and get song.title and lowercase it, then merge song title */
        song.title
          .toLowerCase()
          .replaceAll(' ', '')
          /* check if song.title includes input value */
          .includes(thisSearch.input.value.toLowerCase())
      );
    });
  }

  generateCategorySelect() {
    const thisSearch = this;
    /* set empty array called songsCategories */
    const songsCategories = [];
    /* for each song of thisSearch.dataSongs */
    for (let song of thisSearch.dataSongs) {
      /* for each category of song */
      for (let category of song.categories) {
        /* if the array named songsCategories has no category */
        if (!songsCategories.includes(category)) {
          /* add category to array named songsCategories */
          songsCategories.push(category);
        }
      }
    }
    /* for each category from songsCategories array  */
    songsCategories.forEach((category) => {
      /* set variable opt which create element <option></otpion> */
      let opt = document.createElement('option');
      /* inside option innerText with category  */
      opt.innerText = category;
      /* append category as a child of select form */
      thisSearch.categorySelector.appendChild(opt);
    });
  }

  generateSongCounterValidation(param) {
    const thisSearch = this;
    /* if filteredSongs array has one element */
    if (param.length === 1) {
      /* add song counter */
      thisSearch.songsCounter.innerHTML =
        'We have found ' + param.length + ' song...';
      /* if filteredSongs array has less than one or more than one elements */
    } else {
      /* add song counter */
      thisSearch.songsCounter.innerHTML =
        'We have found ' + param.length + ' songs...';
    }
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

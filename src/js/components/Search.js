import { templates, classList, select } from '../settings.js';

export class Search {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.getData(data);
    thisSearch.filterElements();
    thisSearch.setDefaultValues();
    thisSearch.generateCategorySelect();
  }

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.searchPage();

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

  setDefaultValues() {
    const thisSearch = this;

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
          thisSearch.categorySelector.value =
            thisSearch.categorySelector.children[0].value;
        }
      });
    }

    const mutationObserver = new MutationObserver(callback);

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
        /* based on the song list generate HTML element using template songWrapper */
        const generatedHTML = templates.songWrapper(thisSearch.dataSongs);
        /* set generatedHTML as innerHTML of songsContainer  */
        thisSearch.songsContainer.innerHTML = generatedHTML;
        /* add song counter */
        thisSearch.songsCounter.innerHTML =
          'We have found ' + thisSearch.dataSongs.length + ' songs...';
      } else if (
        /* if name input has value and category select has set default option  */
        thisSearch.input.value &&
        thisSearch.categorySelector.value ==
          thisSearch.categorySelector.children[0].value
      ) {
        /* set array named filteredSongs which filter for each song from songs list */
        const filteredSongs = thisSearch.dataSongs.filter((song) => {
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

        /* if filteredSongs array has no contents */
        if (filteredSongs.length == 0) {
          /* remove all content from songsContainer */
          thisSearch.songsContainer.innerHTML = '';
          /* add song counter */
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' songs...';
        } else {
          /* if filteredSongs array has one element */
          if (filteredSongs.length === 1) {
            /* add song counter */
            thisSearch.songsCounter.innerHTML =
              'We have found ' + filteredSongs.length + ' song...';
            /* if filteredSongs array has less than one or more than one elements */
          } else {
            /* add song counter */
            thisSearch.songsCounter.innerHTML =
              'We have found ' + filteredSongs.length + ' songs...';
          }
          /* based on the song list generate HTML element using template songWrapper */
          const generatedHTML = templates.songWrapper(filteredSongs);
          /* set generatedHTML as innerHTML of songsContainer  */
          thisSearch.songsContainer.innerHTML = generatedHTML;
        }
      } else if (
        /* if name input has no value and category select has chosen option */
        !thisSearch.input.value &&
        thisSearch.categorySelector.value == thisSearch.categorySelector.value
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

        if (filteredSongs.length === 1) {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' song...';
        } else {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' songs...';
          /* based on the song list generate HTML element using template songWrapper */
          const generatedHTML = templates.songWrapper(filteredSongs);
          /* set generatedHTML as innerHTML of songsContainer  */
          thisSearch.songsContainer.innerHTML = generatedHTML;
        }
      } else if (
        /* if name input has value and category select has chosen option */
        thisSearch.input.value &&
        thisSearch.categorySelector.value == thisSearch.categorySelector.value
      ) {
        /* set array named songsFilteredByName which filter for each song from songs list */
        const songsFilteredByName = thisSearch.dataSongs.filter((song) => {
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
        /* create empty array named songsFilteredByCategory*/
        const songsFilteredByCategory = [];
        /* for every song of songsFilteredByName array */
        for (let song of songsFilteredByName) {
          /* if song.categories includes value form category select form */
          if (song.categories.includes(thisSearch.categorySelector.value)) {
            /* add song to array named songsFilteredByCategory */
            songsFilteredByCategory.push(song);
          }
        }

        if (songsFilteredByCategory.length === 1) {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + songsFilteredByCategory.length + ' song...';
        } else {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + songsFilteredByCategory.length + ' songs...';
        }

        const generatedHTML = templates.songWrapper(songsFilteredByCategory);
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

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: '.search-wrapper .song-player',
      stopOthersOnPlay: true,
    });
  }
}

import { templates, classList, select } from '../settings.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.filterElements(data);
    thisSearch.setDefault();
  }

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.searchPage();

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  setDefault() {
    const thisSearch = this;

    thisSearch.navSearchLink = document.querySelector('[href="#search"');

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
        }
      });
    }

    const mutationObserver = new MutationObserver(callback);

    mutationObserver.observe(thisSearch.navSearchLink, { attributes: true });
  }

  filterElements(data) {
    const thisSearch = this;

    thisSearch.dataSongs = data;

    thisSearch.button = thisSearch.dom.wrapper.querySelector(
      select.searchPage.button
    );
    thisSearch.input = thisSearch.dom.wrapper.querySelector(
      select.searchPage.input
    );
    thisSearch.alerts = document.querySelectorAll(select.searchPage.alerts);
    thisSearch.songsContainer = document.querySelector(
      select.searchPage.songsContainer
    );
    thisSearch.songsCounter = document.querySelector(
      select.searchPage.songsCounter
    );

    thisSearch.button.addEventListener('click', function () {
      if (!thisSearch.input.value) {
        thisSearch.songsCounter.classList.add(classList.hidden);
        thisSearch.alerts[1].classList.add(classList.hidden);
        thisSearch.songsContainer.innerHTML = '';
        thisSearch.alerts[0].classList.remove(classList.hidden);
      } else {
        thisSearch.alerts[0].classList.add(classList.hidden);
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
          thisSearch.songsCounter.classList.add(classList.hidden);
          thisSearch.alerts[1].classList.remove(classList.hidden);
          thisSearch.songsContainer.innerHTML = '';
          thisSearch.input.value = null;
        } else {
          thisSearch.songsCounter.innerHTML =
            'We have found ' + filteredSongs.length + ' songs...';
          thisSearch.songsCounter.classList.remove(classList.hidden);
          thisSearch.alerts[1].classList.add(classList.hidden);
          thisSearch.input.value = null;

          const generatedHTML = templates.songWrapper(filteredSongs);
          thisSearch.songsContainer.innerHTML = generatedHTML;
        }
      }
      thisSearch.initMusicPlayerWidget();
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

export default Search;

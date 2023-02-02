import { templates } from '../settings.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.filterElements(data);
  }

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.searchPage();

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;

    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  filterElements(data) {
    const thisSearch = this;

    thisSearch.dataSongs = data;
    thisSearch.searchButton = thisSearch.dom.wrapper.querySelector('.btn');
    thisSearch.searchInput =
      thisSearch.dom.wrapper.querySelector('.form-control');
    thisSearch.inputAlerts = document.querySelectorAll('.search-wrapper p');
    thisSearch.songContainer = document.querySelector(
      '.search-wrapper .song-container'
    );

    thisSearch.searchButton.addEventListener('click', function () {
      if (!thisSearch.searchInput.value) {
        thisSearch.inputAlerts[1].classList.add('hidden');
        thisSearch.songContainer.innerHTML = '';
        thisSearch.inputAlerts[0].classList.remove('hidden');
      } else {
        thisSearch.inputAlerts[0].classList.add('hidden');
        const filteredSongs = thisSearch.dataSongs.filter((song) => {
          return (
            song.author
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(thisSearch.searchInput.value.toLowerCase()) ||
            song.title
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(thisSearch.searchInput.value.toLowerCase())
          );
        });

        if (filteredSongs.length == 0) {
          thisSearch.inputAlerts[1].classList.remove('hidden');
          thisSearch.songContainer.innerHTML = '';
        } else {
          thisSearch.inputAlerts[1].classList.add('hidden');
          const generatedHTML = templates.songWrapper(filteredSongs);
          console.log(filteredSongs.length);

          const searchPageContainer = document.querySelector('.song-container');
          searchPageContainer.innerHTML = generatedHTML;
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

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

    const searchButton = thisSearch.dom.wrapper.querySelector('.btn'),
      searchInput = thisSearch.dom.wrapper.querySelector('.form-control');

    searchButton.addEventListener('click', function () {
      if (!searchInput.value) {
        return alert('No filters selected!');
      } else {
        const filteredSongs = thisSearch.dataSongs.filter((song) => {
          return (
            song.author
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(searchInput.value.toLowerCase()) ||
            song.title
              .toLowerCase()
              .replaceAll(' ', '')
              .includes(searchInput.value.toLowerCase())
          );
        });

        if (filteredSongs.length == 0) {
          return alert('There are no results matching the criteria given');
        } else {
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

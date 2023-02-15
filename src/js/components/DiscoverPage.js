import { select, templates } from '../settings.js';

export class DiscoverPage {
  constructor(element, allSongs, favouriteSongs) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.discoverSong(allSongs, favouriteSongs);
    thisDiscover.randomSongPicker(allSongs);
  }

  render(element) {
    const thisDiscover = this,
      generatedHTML = templates.discoverPage();

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  discoverSong(allSongs, favouriteSongs) {
    const thisDiscover = this,
      navDiscoverLink = document.querySelector(select.nav.discoverLink);

    navDiscoverLink.addEventListener('click', function () {
      !favouriteSongs.length
        ? thisDiscover.randomSongPicker(allSongs)
        : thisDiscover.randomSongPicker(favouriteSongs);
    });
  }

  randomSongPicker(songsList) {
    const thisDiscover = this,
      randomNumber = Math.floor(Math.random() * songsList.length),
      randomSong = songsList.slice(randomNumber, randomNumber + 1);

    thisDiscover.generateMusicPlayer(randomSong);
  }

  generateMusicPlayer(filters) {
    const thisDiscover = this,
      songsContainer = document.querySelector(
        select.discoverPage.songsContainer
      ),
      generatedHTML = templates.songWrapper(filters);

    songsContainer.innerHTML = generatedHTML;

    thisDiscover.initMusicPlayerWidget();
  }

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: select.discoverPage.songPlayer,
      stopOthersOnPlay: true,
    });
  }
}

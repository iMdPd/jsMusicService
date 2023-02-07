import { classList, select, templates } from '../settings.js';

export class Discover {
  constructor(element, allSongs, favouriteSongs) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.randomSongPicker(allSongs, favouriteSongs);
  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discoverPage();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;

    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  randomSongPicker(allSongs, favouriteSongs) {
    const thisDiscover = this;

    thisDiscover.favouriteSongs = favouriteSongs;
    thisDiscover.allSongs = allSongs;

    thisDiscover.songsContainer = document.querySelector(
      select.discoverPage.songsContainer
    );

    const navDiscoverLink = document.querySelector(select.nav.discoverLink);

    navDiscoverLink.addEventListener('click', function () {
      if (thisDiscover.favouriteSongs.length == 0) {
        thisDiscover.generateRandomSong(thisDiscover.allSongs);
      } else {
        thisDiscover.generateRandomSong(thisDiscover.favouriteSongs);
      }

      thisDiscover.initMusicPlayerWidget();
    });
  }

  generateRandomSong(songsList) {
    const thisDiscover = this;
    const generatedHTML = templates.songWrapper(songsList);

    thisDiscover.songsContainer.innerHTML = generatedHTML;

    const discoverSongs = thisDiscover.dom.wrapper.querySelectorAll(
      select.discoverPage.songWrapper
    );

    for (let song of discoverSongs) {
      song.classList.add(classList.hidden);
    }

    const songsArrayLength = songsList.length;

    const randomNumber = Math.floor(Math.random() * songsArrayLength);

    const chosenSong = thisDiscover.songsContainer.children[randomNumber];

    chosenSong.classList.remove(classList.hidden);
  }

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: '.discover-wrapper .song-player',
      stopOthersOnPlay: true,
    });
  }
}

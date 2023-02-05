import { classList, select, templates } from '../settings.js';

export class Discover {
  constructor(element, allSongs, favouriteCategories) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.songPicker(allSongs, favouriteCategories);
  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discoverPage();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;

    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  songPicker(allSongs, favouriteCategories) {
    const thisDiscover = this;

    const navDiscoverLink = document.querySelector(select.nav.discoverLink);

    thisDiscover.allSongs = allSongs;
    thisDiscover.favouriteCategories = favouriteCategories;

    thisDiscover.songsContainer = document.querySelector(
      select.discoverPage.songsContainer
    );

    navDiscoverLink.addEventListener('click', function () {
      console.log(thisDiscover.favouriteCategories);
      const generatedHTML = templates.songWrapper(thisDiscover.allSongs);

      thisDiscover.songsContainer.innerHTML = generatedHTML;

      const discoverSongs = thisDiscover.dom.wrapper.querySelectorAll(
        select.discoverPage.songWrapper
      );

      for (let song of discoverSongs) {
        song.classList.add(classList.hidden);
      }

      const songsArrayLength = thisDiscover.allSongs.length;

      const randomNumber = Math.floor(Math.random() * songsArrayLength);

      const chosenSong = thisDiscover.songsContainer.children[randomNumber];

      chosenSong.classList.remove(classList.hidden);

      thisDiscover.initMusicPlayerWidget();
    });
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

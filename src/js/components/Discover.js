import { classList, select, templates } from '../settings.js';

export class Discover {
  constructor(element, data) {
    const thisDiscover = this;

    thisDiscover.render(element);
    thisDiscover.songPicker(data);
  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discoverPage();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;

    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  songPicker(data) {
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.songsContainer = document.querySelector(
      select.discoverPage.songsContainer
    );

    const navDiscoverLink = document.querySelector(select.nav.discoverLink);

    navDiscoverLink.addEventListener('click', function () {
      const generatedHTML = templates.songWrapper(thisDiscover.data);

      thisDiscover.songsContainer.innerHTML = generatedHTML;
      const discoverSongs = thisDiscover.dom.wrapper.querySelectorAll(
        select.discoverPage.songWrapper
      );

      for (let song of discoverSongs) {
        song.classList.add(classList.hidden);
      }

      const songsArrayLength = thisDiscover.data.length;

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

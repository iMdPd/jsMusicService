import { templates } from '../settings.js';

class Home {
  constructor(element) {
    const thisHome = this;

    thisHome.render(element);
    thisHome.initMusicPlayer();
  }
  render(element) {
    const thisHome = this;

    thisHome.dom = {};
    thisHome.dom.wrapper = element;

    const generatedHTML = templates.homePage();
    // console.log(generatedHTML);

    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }

  initMusicPlayer() {
    document.addEventListener('DOMContentLoaded', function () {
      /* eslint-disable */
      GreenAudioPlayer.init({
        /* eslint-enable */
        selector: '.song-player',
        stopOthersOnPlay: true,
      });
    });
  }
}

export default Home;

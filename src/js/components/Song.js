import { templates, select } from '../settings.js';

class Song {
  constructor(data) {
    const thisSong = this;

    thisSong.render(data);
  }

  render(data) {
    const thisSong = this;

    const generatedHTML = templates.songWrapper(data);
    // console.log(generatedHTML);

    // thisSong.element = utils.createDOMFromHTML(generatedHTML);

    const homePageContainer = document.querySelector(
      select.containerOf.homePage
    );
    homePageContainer.innerHTML = generatedHTML;
    thisSong.initMusicPlayerWidget();
  }

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: '.home-wrapper  .song-player',
      stopOthersOnPlay: true,
    });
  }
}

export default Song;

import { templates, select } from '../settings.js';

export class Songs {
  constructor(data) {
    const thisSong = this;

    thisSong.render(data);
  }

  render(data) {
    const thisSong = this;

    const generatedHTML = templates.songWrapper(data);

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

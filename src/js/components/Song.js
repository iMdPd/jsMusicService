import { templates, select } from '../settings.js';

export class Song {
  constructor(data) {
    const thisSong = this;

    thisSong.render(data);
  }

  render(data) {
    const thisSong = this,
      generatedHTML = templates.songWrapper(data),
      homePageContainer = document.querySelector(select.containerOf.homePage);

    homePageContainer.innerHTML = generatedHTML;

    thisSong.initMusicPlayerWidget();
  }

  initMusicPlayerWidget() {
    /* eslint-disable */
    GreenAudioPlayer.init({
      /* eslint-enable */
      selector: select.homePage.songPlayer,
      stopOthersOnPlay: true,
    });
  }
}

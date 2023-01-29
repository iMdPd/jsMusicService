import { templates, select } from '../settings.js';
import utils from '../utils.js';

class Song {
  constructor(data) {
    const thisSong = this;

    thisSong.render(data);
  }

  render(data) {
    const thisSong = this;

    const generatedHTML = templates.songWrapper(data);
    // console.log(generatedHTML);

    thisSong.element = utils.createDOMFromHTML(generatedHTML);

    const homePageContainer = document.querySelector(
      select.containerOf.homePage
    );
    homePageContainer.appendChild(thisSong.element);
  }
}

export default Song;

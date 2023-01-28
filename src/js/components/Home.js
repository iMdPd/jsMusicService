import { templates, select } from '../settings.js';
import utils from '../utils.js';

class Home {
  constructor(data) {
    const thisHome = this;

    thisHome.render(data);
  }

  render(data) {
    const thisHome = this;

    thisHome.dom = {};
    thisHome.dom.wrapper = data;

    const generatedHTML = templates.homePage(data);
    // console.log(generatedHTML);

    thisHome.element = utils.createDOMFromHTML(generatedHTML);

    const menuContainer = document.querySelector(select.containerOf.home);
    menuContainer.appendChild(thisHome.element);
  }
}

export default Home;

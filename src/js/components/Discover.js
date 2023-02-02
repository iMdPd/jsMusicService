import { templates } from '../settings.js';

export class Discover {
  constructor(element, data) {
    const thisDiscover = this;

    thisDiscover.render(element);
  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discoverPage();
    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;

    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }
}

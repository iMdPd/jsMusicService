import { templates } from '../settings.js';

class Subscribe {
  constructor(element) {
    const thisSubscribe = this;

    thisSubscribe.render(element);
  }

  render(element) {
    const thisSubscribe = this;

    thisSubscribe.dom = {};
    thisSubscribe.dom.wrapper = element;

    const generatedHTML = templates.subscribe();
    console.log(generatedHTML);
    thisSubscribe.dom.wrapper.innerHTML = generatedHTML;
  }
}

export default Subscribe;

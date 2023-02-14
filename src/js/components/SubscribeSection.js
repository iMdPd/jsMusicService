import { templates } from '../settings.js';

export class SubscribeSection {
  constructor(element) {
    const thisSubscribe = this;

    thisSubscribe.render(element);
  }

  render(element) {
    const thisSubscribe = this;

    thisSubscribe.dom = {};
    thisSubscribe.dom.wrapper = element;

    const generatedHTML = templates.subscribe();
    thisSubscribe.dom.wrapper.innerHTML = generatedHTML;
  }
}

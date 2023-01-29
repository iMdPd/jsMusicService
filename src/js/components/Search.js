import { templates, select } from '../settings.js';
import utils from '../utils.js';

class Search {
  constructor(element, data) {
    const thisSearch = this;

    thisSearch.render(element);
    thisSearch.filterElements(data);
  }

  render(element) {
    const thisSearch = this;

    const generatedHTML = templates.searchPage();
    // console.log(generatedHTML);

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;

    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  filterElements(data) {
    const thisSearch = this;

    thisSearch.dataSongs = data;
    console.log(thisSearch.dataSongs);

    const searchButton = thisSearch.dom.wrapper.querySelector('.btn');

    searchButton.addEventListener('click', function () {
      const searchInput = thisSearch.dom.wrapper.querySelector('.form-control');

      console.log(searchInput.value);

      const generatedHTML = templates.songWrapper(data);
      // console.log(generatedHTML);

      thisSearch.element = utils.createDOMFromHTML(generatedHTML);

      const searchPageContainer = document.querySelector(
        select.containerOf.searchPage
      );
      searchPageContainer.appendChild(thisSearch.element);

      if (searchInput.value) {
        for (let i = 0; i < thisSearch.dataSongs.length; i++) {
          if (
            thisSearch.dataSongs[i].author
              .toLowerCase()
              .includes(searchInput.value.toLowerCase())
          ) {
            thisSearch.dataSongs[i].classList.remove('is-hidden');
          } else {
            thisSearch.dataSongs[i].classList.add('is-hidden');
          }
        }
      } else {
        return alert('No filters selected!');
      }
    });
  }
}

export default Search;

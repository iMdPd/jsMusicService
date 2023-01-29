import { templates } from '../settings.js';

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
    console.log(thisSearch.dataSongs[1].textContent);

    const searchButton = thisSearch.dom.wrapper.querySelector('.btn');

    searchButton.addEventListener('click', function () {
      const searchInput = thisSearch.dom.wrapper.querySelector('.form-control');

      console.log(searchInput.value);

      if (searchInput.value) {
        return alert('OK!');
      } else {
        return alert('No filters selected!');
      }
    });
  }
}

export default Search;

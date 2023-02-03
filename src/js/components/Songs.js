import { templates, select } from '../settings.js';

export class Songs {
  constructor(data) {
    const thisSong = this;

    thisSong.render(data);
    thisSong.generateCategoryList(data);
    thisSong.filterSongs();
  }

  render(data) {
    const thisSong = this;

    const generatedHTML = templates.songWrapper(data);

    thisSong.homePageContainer = document.querySelector(
      select.containerOf.homePage
    );
    thisSong.homePageContainer.innerHTML = generatedHTML;
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

  generateCategoryList(data) {
    const thisSong = this;
    thisSong.songs = data;

    const songsCategories = [];
    thisSong.categoriesList = document.getElementById('categories-list');

    for (let song of thisSong.songs) {
      for (let category of song.categories) {
        if (!songsCategories.includes(category)) {
          songsCategories.push(category);
        }
      }
    }

    songsCategories.forEach((category) => {
      let li = document.createElement('li');
      li.innerText = category;
      thisSong.categoriesList.appendChild(li);
    });
  }

  filterSongs() {
    const thisSong = this;
    const filteredCategories = [];

    for (let category of thisSong.categoriesList.children) {
      category.addEventListener('click', function () {
        const clickedCategory = this;
        clickedCategory.classList.toggle('selected');

        if (clickedCategory.classList.contains('selected')) {
          if (!filteredCategories.includes(clickedCategory.innerHTML)) {
            filteredCategories.push(clickedCategory.innerHTML);
          }
        } else {
          const removeCategory = filteredCategories.indexOf(
            clickedCategory.innerHTML
          );

          filteredCategories.splice(removeCategory, 1);
        }

        for (let songWrapper of thisSong.homePageContainer.children) {
          let shouldBeHidden = false;

          const songWrapperDescription =
            songWrapper.querySelector('.song-description');

          const songWrapperIncludedText =
            songWrapperDescription.firstElementChild.firstElementChild.innerHTML
              .replace('Categories:', '')
              .trim()
              .slice(0, -1);

          const songWrapperCategories = songWrapperIncludedText.split(',  ');

          for (let filter of filteredCategories) {
            if (!songWrapperCategories.includes(filter)) {
              shouldBeHidden = true;
              break;
            }
          }

          if (shouldBeHidden) {
            songWrapper.classList.add('hidden');
          } else {
            songWrapper.classList.remove('hidden');
          }
        }
      });
    }
  }
}

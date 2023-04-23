import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ApiFalleryImg } from './fetchFalleryImg.js';
import { typeFailure, typeSuccess, typeInfo } from './message.js';

const apiService = new ApiFalleryImg();

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnFindMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', onSearch);
btnFindMore.addEventListener('click', onFindMore);

function onSearch(event) {
  event.preventDefault();

  apiService.query = event.target.elements.searchQuery.value.trim();
  hiddBtn();
  apiService.resetPage();
  apiService
    .fetchFalleryImg()
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        showError();
      } else {
        clearMarkup();
        appendMarkup(hits);
        createGallery();
        showMessage(typeSuccess, `Hooray! We found ${totalHits} images.`);
        showBtn();
      }
    })
    .catch(showError);
}

function onFindMore() {
    apiService
      .fetchFalleryImg()
      .then(({ hits, totalHits }) => {
        appendMarkup(hits);
        createGallery();
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
        if (apiService.perPage * apiService.page > totalHits) {
          hiddBtn();
          showMessage(
            typeInfo,
            "We're sorry, but you've reached the end of search results."
          );
        }
      })
      .catch(showError);
}
function appendMarkup(hits) {
    gallery.insertAdjacentHTML('beforeend', createDataMarkup(hits));
  }
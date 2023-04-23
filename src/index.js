import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { ApiFalleryImg } from './fetchFalleryImg.js';
import { typeFailure, typeSuccess, typeInfo } from './message.js';

const apiService = new ApiFalleryImg();

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnFindMore = document.querySelector('.load-more');
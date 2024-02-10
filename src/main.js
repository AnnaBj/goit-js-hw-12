import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightBox = new SimpleLightbox('.gallery-link');

const formElement = document.querySelector('.form');
const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
const loadBtnElement = document.querySelector('.more');

let currentPage = 1;
let itemsPerPage = 15;
let currentSearchQuery;
loadBtnElement.style.display = 'none';
loaderElement.style.display = 'none';

async function fetchImages(searchQuery, page) {
  const queryParams = {
    key: '42296556-10e657c6d09903018112d9d9d',
    q: searchQuery,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: itemsPerPage,
  };
  const urlParams = new URLSearchParams(queryParams);
  const { data } = await axios.get(`https://pixabay.com/api/?${urlParams}`);
  return data;
}

formElement.addEventListener('submit', async e => {
  e.preventDefault();
  currentPage = 1;
  loadBtnElement.style.display = 'none';
  galleryElement.innerHTML = '';
  currentSearchQuery = formElement.elements.search.value.trim();
  if (currentSearchQuery === '') {
    iziToast.show({
      message: 'Please write search image',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
    return;
  }

  loaderElement.style.display = 'inline-block';
  try {
    const { hits, totalHits } = await fetchImages(
      currentSearchQuery,
      currentPage
    );
    if (totalHits === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
      loaderElement.style.display = 'none';
      return;
    }
    displayImages(hits);
    if (totalHits < itemsPerPage) {
      showNotification();
    } else {
      loadBtnElement.style.display = 'block';
    }
  } catch (error) {
    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } finally {
    formElement.reset();
  }
});

loadBtnElement.addEventListener('click', async () => {
  currentPage += 1;

  loaderElement.style.display = 'inline-block';
  try {
    const { hits, totalHits } = await fetchImages(
      currentSearchQuery,
      currentPage
    );
    displayImages(hits);
    scrollPage();
    if (itemsPerPage * currentPage > totalHits) {
      showNotification();
    }
  } catch (error) {
    iziToast.show({
      message: `Sorry, ${error}`,
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'bottomCenter',
    });
  }
});

function displayImages(images) {
  const htmlMarkup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" width="360" />
        </a>
        <div class="img-text">
          <div class="img-info">
            <h3>Likes</h3>
            <p>${likes}</p>
          </div>
          <div class="img-info">
            <h3>Views</h3>
            <p>${views}</p>
          </div>
          <div class="img-info">
            <h3>Comments</h3>
            <p>${comments}</p>
          </div>
          <div class="img-info">
            <h3>Downloads</h3>
            <p>${downloads}</p>
          </div>
        </div>
      </li>
    `
    )
    .join('');

  galleryElement.insertAdjacentHTML('beforeend', htmlMarkup);
  lightBox.refresh();
  loaderElement.style.display = 'none';
}

function showNotification() {
  iziToast.show({
    message: 'We are sorry, but you have reached the end of search results.',
    messageColor: '#FAFAFB',
    backgroundColor: '#1DB8F5',
    position: 'topRight',
  });
  loadBtnElement.style.display = 'none';
  loaderElement.style.display = 'none';
}

function scrollPage() {
  const listItem = document.querySelector('.gallery-item');
  const scrollHeight = listItem.getBoundingClientRect().height * 2;
  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
}
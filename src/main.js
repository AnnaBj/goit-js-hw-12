import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
loader.style.display = 'none';
const searchParams = {
  key: '42296556-10e657c6d09903018112d9d9d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

form.addEventListener('submit', e => {
  e.preventDefault();
  loader.style.display = 'inline-block';
  gallery.innerHTML = '';
  const inputText = form.elements.search.value.trim();
  searchParams.q = inputText;
  fetchImage()
    .then(images => renderGallery(images))
    .catch(error => console.log(error));

  form.reset();
});

function fetchImage() {
  const urlparams = new URLSearchParams(searchParams);
  return fetch(`https://pixabay.com/api/?${urlparams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function renderGallery(images) {
  if (images.hits.length === 0) {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#FAFAFB',
      backgroundColor: '#EF4040',
      position: 'topRight',
    });
  } else {
    const item = images.hits
      .map(
        image => `<li class="gallery-item">
    <a class="gallery-link" href="${image.largeImageURL}" >
      <img
        class="gallery-image"
        src="${image.webformatURL}"
        alt="${image.tags}"
      width = "360"
      />
    </a>
    <div class="img-text">
    <div class="img-info">
    <h3>Likes</h3>
    <p> ${image.likes}</p>
    </div>
    <div class="img-info">
    <h3>Views</h3>
    <p> ${image.views}</p>
    </div>
       <div class="img-info">
    <h3>Comments</h3>
    <p> ${image.comments}</p>
    </div>
       <div class="img-info">
    <h3>Downloads</h3>
    <p> ${image.downloads}</p>
    </div>
      </div>
  </li>`
      )
      .join('');

    gallery.innerHTML = item;
    const lightBox = new SimpleLightbox('.gallery-link');
    lightBox.refresh();
  }
  loader.style.display = 'none';
}

const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const galleryContainerRef = document.querySelector('.js-gallery');
const modalRef = document.querySelector('.lightbox');
const modalImageRef = document.querySelector('.lightbox__image');
const btnCloseModalRef = document.querySelector('[data-action="close-lightbox"]');
const modalOverlayRef = document.querySelector('.lightbox__overlay');
const imgListRef = document.querySelectorAll('.gallery__image');

const cardsMarcup = createImageCards(galleryItems);
const imgListSrc = galleryItems.map((el) => el.original);


galleryContainerRef.insertAdjacentHTML('beforeend', cardsMarcup);
galleryContainerRef.addEventListener('click', onlOpenModal);
btnCloseModalRef.addEventListener('click', onCloseModal);
modalOverlayRef.addEventListener('click', onCloseModal);
window.addEventListener('keydown', onCloseModalEsc)
window.addEventListener('keydown', onNextImgSrc);
window.addEventListener('keydown', onPreviousImgSrc);


function createImageCards(galleryItems) {
  return galleryItems.map(({preview, original, description}) => {
    return `<li class="gallery__item">
      <a class="gallery__link" href='${original}'>
        <img
          class="gallery__image"
          src='${preview}'
          data-source='${original}'
          alt='${description}'
        />
      </a>
    </li>`;
  }).join('');
};

function onlOpenModal(event) {
  event.preventDefault()
  if (event.target.nodeName !== 'IMG') {
    return;
  };
  modalRef.classList.add('is-open');
  modalImageRef.src = event.target.dataset.source
};

function onCloseModal () {
  modalRef.classList.remove('is-open');
  modalImageRef.src = '';
}

function onCloseModalEsc (event) {
  if (event.code === 'Escape') {
    onCloseModal();
  };
};

function onNextImgSrc (event) {
  if (event.code === "ArrowRight") {

    let currentIndex = imgListSrc.indexOf(modalImageRef.src);
    currentIndex += 1;
    modalImageRef.src = imgListSrc[currentIndex];

    console.log(currentIndex);

    if (currentIndex > imgListSrc.length - 1) {
      modalImageRef.src = imgListSrc[0];
    };
  };
};

function onPreviousImgSrc (event) {
  if (event.code === "ArrowLeft") {

    let currentIndex = imgListSrc.indexOf(modalImageRef.src);
    currentIndex -= 1;
    modalImageRef.src = imgListSrc[currentIndex];

    if (currentIndex < 0) {
      modalImageRef.src = imgListSrc[imgListSrc.length - 1];
    };
  };
};
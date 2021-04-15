// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы
// при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import atributesSource from './gallery-items.js'
console.log(atributesSource)

const galleryContainer = document.querySelector('ul.js-gallery')
const lightboxContainer = document.querySelector('.js-lightbox')
const lightboxImage = document.querySelector('img.lightbox__image')
const lightboxCloseButton = document.querySelector('button[data-action="close-lightbox"]')

const galleryMarkup = createImages(atributesSource)
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)
function createImages(images) {
    return images.map(({preview, original, description}) => {
        return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`}).join('')
}

galleryContainer.addEventListener('click', stopDefAction)
function stopDefAction(evt) {
    evt.preventDefault();
}

galleryContainer.addEventListener('click', onGalleryContainerClick)
function onGalleryContainerClick(event) {   
if (!event.target.classList.contains('gallery__image')) {return}
  lightboxContainer.classList.add('is-open')
  lightboxImage.setAttribute('src', `${event.target.dataset.source}`)
  lightboxImage.setAttribute('alt', `${event.target.getAttribute('alt')}`)
}

lightboxCloseButton.addEventListener('click', onLightboxCloseButton)
function onLightboxCloseButton() {
  lightboxContainer.classList.remove('is-open')
  lightboxImage.setAttribute('src', '')
  lightboxImage.setAttribute('alt', '')
}
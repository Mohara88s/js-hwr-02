// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы
// при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Дополнительно
// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import atributesSource from './gallery-items.js'

const galleryContainer = document.querySelector('ul.js-gallery')
const lightboxContainer = document.querySelector('.js-lightbox')
const lightboxImage = document.querySelector('img.lightbox__image')
const lightboxCloseButton = document.querySelector('button[data-action="close-lightbox"]')

//creating markup
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

//none linking
galleryContainer.addEventListener('click', stopDefAction)
function stopDefAction(evt) {
    evt.preventDefault();
}

//to open modal
galleryContainer.addEventListener('click', onGalleryImageClick)
function onGalleryImageClick(event) {   
  if (!event.target.classList.contains('gallery__image')) { return }
  lightboxContainer.classList.add('is-open')
  lightboxImage.setAttribute('src', `${event.target.dataset.source}`)
  lightboxImage.setAttribute('alt', `${event.target.getAttribute('alt')}`)

  window.addEventListener('keydown', onKaydown)
  lightboxCloseButton.addEventListener('click', onlightboxCloseButtoClick)
  lightboxContainer.addEventListener('click', onlightboxOverlayClick)
}

//to close modal
function lightboxClose() {
  lightboxContainer.classList.remove('is-open')
  lightboxImage.setAttribute('src', '')
  lightboxImage.setAttribute('alt', '')

  window.removeEventListener('keydown', onKaydown)
  lightboxCloseButton.removeEventListener('click', onlightboxCloseButtoClick)
  lightboxContainer.removeEventListener('click', onlightboxOverlayClick)
}

//onClick
function onlightboxCloseButtoClick() {
  lightboxClose()
}
function onlightboxOverlayClick(event) {
  if (event.target.classList.contains('lightbox__overlay')) {lightboxClose()}
}

// onKaydown
function onKaydown(event) {
  if (event.code === 'Escape') {
    lightboxClose()
  }
  if (event.code === 'ArrowRight') {
    onArrowRightKaydown()
  }
  if (event.code === 'ArrowLeft') {
    onArrowLeftKaydown()
  }
}

//arrows
function lightboxImageIndex() {
  return atributesSource.indexOf(atributesSource.find(element => element.original === lightboxImage.src))
}
function onArrowRightKaydown() {
  let i = lightboxImageIndex() + 1
  if (i === atributesSource.length) { i = 0 }
  lightboxImage.setAttribute('src', atributesSource[i].original)
  lightboxImage.setAttribute('alt', atributesSource[i].description)
}
function onArrowLeftKaydown() {
  let i = lightboxImageIndex() - 1
  if (i === -1) { i = atributesSource.length - 1}
  lightboxImage.setAttribute('src', atributesSource[i].original)
  lightboxImage.setAttribute('alt', atributesSource[i].description)
 }
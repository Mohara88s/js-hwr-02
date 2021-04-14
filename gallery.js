// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того, чтобы
// при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import atributesSource from './gallery-items.js'
console.log(atributesSource)

const galleryContainer = document.querySelector('.js-gallery')
console.log(galleryContainer)
const galleryMarkup = createImages(atributesSource)


galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup)



function createImages(images) {
    return images.map(({preview, original, description}) => {
        return `
    <li class="gallery__item">
  <div
    class="gallery__link"
    href=""
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </div>
</li>
`}).join('')
}


galleryContainer.addEventListener('click', onGalleryContainerClick)

function onGalleryContainerClick(event) {
    
if (!event.target.classList.contains('gallery__image')) {return}
    console.log(event.target.dataset.source)
}
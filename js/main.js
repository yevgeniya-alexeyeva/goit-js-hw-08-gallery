import galleryItems from "./gallery-items.js";
const ref = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  closeBtn: document.querySelector("button[data-action='close-lightbox']"),
  modalImage: document.querySelector(".lightbox__image"),
  overlay: document.querySelector("div.lightbox__overlay"),
};

const openModal = () => {
  ref.modal.classList.add("is-open");
};
const closeModal = () => {
  ref.modal.classList.remove("is-open");
  clearModalImgSrc();
};
const closeModalByEscape = (event) => {
  if (event.code === "Escape") closeModal();
};
const setModalImgSrc = (bigImageURL) => {
  if (ref.modal.classList.contains("is-open"))
    ref.modalImage.setAttribute("src", bigImageURL);
};
const clearModalImgSrc = (bigImageURL) => {
  if (!ref.modal.classList.contains("is-open"))
    ref.modalImage.setAttribute("src", "");
};

const galleryItemsString = galleryItems
  .map(
    (galleryItem) =>
      `<li class="gallery__item"><a class="gallery__link" href="${galleryItem.original}"><img class="gallery__image" src="${galleryItem.preview}" data-source="${galleryItem.original}" alt="${galleryItem.description}"/></a></li>`
  )
  .join("");
console.log(galleryItemsString);
ref.gallery.insertAdjacentHTML("beforeend", galleryItemsString);

const getBigImage = (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") return;
  const bigImageURL = target.dataset.source;
  openModal();
  setModalImgSrc(bigImageURL);
};
const leafImages = (event) => {
  if (ref.modal.classList.contains("is-open")) {
    const currentImgSourse = ref.modalImage.getAttribute("src");
    const currentIndex = galleryItems.indexOf(
      galleryItems.find((item) => item.original === currentImgSourse)
    );
    if (event.code === "ArrowRight") leafRight(currentIndex);
    if (event.code === "ArrowLeft") leafLeft(currentIndex);
  }
};
const leafRight = (currentIndex) => {
  if (currentIndex === galleryItems.length - 1) return;
  const nextImgSourse = galleryItems[currentIndex + 1].original;
  ref.modalImage.setAttribute("src", nextImgSourse);
};
const leafLeft = (currentIndex) => {
  if (currentIndex === 0) return;
  const previousImgSourse = galleryItems[currentIndex - 1].original;
  ref.modalImage.setAttribute("src", previousImgSourse);
};

ref.gallery.addEventListener("click", getBigImage);
ref.closeBtn.addEventListener("click", closeModal);
ref.overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", closeModalByEscape);
document.addEventListener("keydown", leafImages);

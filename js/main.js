import galleryItems from "./gallery-items.js";
const ref = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  closeBtn: document.querySelector("button[data-action='close-lightbox']"),
  modalImage: document.querySelector(".lightbox__image"),
  overlay: document.querySelector("div.lightbox__overlay"),
};

const galleryItemsString = galleryItems
  .map(
    (galleryItem) =>
      `<li class="gallery__item"><a class="gallery__link" href="${galleryItem.original}"><img class="gallery__image" src="${galleryItem.preview}" data-source="${galleryItem.original}" alt="${galleryItem.description}"/></a></li>`
  )
  .join("");
ref.gallery.insertAdjacentHTML("beforeend", galleryItemsString);

const closeModal = () => {
  ref.modal.classList.remove("is-open");

  ref.closeBtn.removeEventListener("click", closeModal);
  ref.overlay.removeEventListener("click", closeModal);
  document.removeEventListener("keydown", closeModalByEscape);
  document.removeEventListener("keydown", leafImages);

  clearModalImgSrc();
};

const closeModalByEscape = (event) => {
  if (event.code === "Escape") closeModal();
};

const clearModalImgSrc = (bigImageURL) => {
  if (!ref.modal.classList.contains("is-open"))
    ref.modalImage.setAttribute("src", "");
};

const getBigImage = (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") return;
  const bigImageURL = target.dataset.source;
  ref.modal.classList.add("is-open");

  ref.closeBtn.addEventListener("click", closeModal);
  ref.overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", closeModalByEscape);
  document.addEventListener("keydown", leafImages);

  if (ref.modal.classList.contains("is-open"))
    ref.modalImage.setAttribute("src", bigImageURL);
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

ref.gallery.addEventListener("click", getBigImage);

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
const setModalImgSrc = (bigImageURL) => {
  if (ref.modal.classList.contains("is-open"))
    ref.modalImage.setAttribute("src", bigImageURL);
  console.log("setModal");
};
const clearModalImgSrc = (bigImageURL) => {
  if (!ref.modal.classList.contains("is-open"))
    ref.modalImage.setAttribute("src", "");
  console.log("clearModal");
};

galleryItems.map((galleryItem) => {
  ref.gallery.insertAdjacentHTML(
    "beforeend",
    `<li class="gallery__item">
<a
  class="gallery__link"
  href="${galleryItem.original}"
>
  <img
    class="gallery__image"
    src="${galleryItem.preview}"
    data-source="${galleryItem.original}"
    alt="${galleryItem.description}"
  />
</a>
</li>`
  );
});
const getBigImage = (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== "IMG") return;
  const bigImageURL = target.dataset.source;
  openModal();
  setModalImgSrc(bigImageURL);
};
ref.gallery.addEventListener("click", getBigImage);
ref.closeBtn.addEventListener("click", closeModal);
ref.overlay.addEventListener("click", closeModal);

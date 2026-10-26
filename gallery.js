/* Open the Gallery pop-up linked to each Gallery card */
const galleryCards = document.querySelectorAll(".galleryCard");
const galleryCloseButtons = document.querySelectorAll(".galleryModalClose");
const galleryModals = document.querySelectorAll(".galleryModal");

galleryCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const modalId = card.getAttribute("data-modal");
        const selectedModal = document.getElementById(modalId);

        selectedModal.classList.add("isOpen");
        selectedModal.setAttribute("aria-hidden", "false");
    });
});

/* Close a Gallery pop-up */
function closeGalleryModal(modal) {
    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");

    /* Return its scroll position to the top */
    const modalBox = modal.querySelector(".galleryModalBox");
    modalBox.scrollTop = 0;
}

/* Close with the X button */
galleryCloseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const modal = button.closest(".galleryModal");
        closeGalleryModal(modal);
    });
});

/* Close when clicking the darker area outside the white box */
galleryModals.forEach(function (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeGalleryModal(modal);
        }
    });
});

/* Close an open Gallery pop-up with the Escape key */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        galleryModals.forEach(function (modal) {
            if (modal.classList.contains("isOpen")) {
                closeGalleryModal(modal);
            }
        });
    }
});

/* Soft Gallery hero slideshow */
const galleryHeroImages = [
    "images/maxresdefault (1).jpg",
    "images/Sthaneshwar1.jpg",
    "images/culture.webp",
    "images/jyotisar.jpg"
];

let galleryImageNumber = 0;

const activeGallerySlide = document.getElementById("galleryHeroImage");
const nextGallerySlide = document.getElementById("nextgalleryHeroImage");

if (activeGallerySlide && nextGallerySlide) {
    let visibleGallerySlide = activeGallerySlide;
    let hiddenGallerySlide = nextGallerySlide;

    setInterval(function () {
        galleryImageNumber =
            (galleryImageNumber + 1) % galleryHeroImages.length;

        hiddenGallerySlide.src = galleryHeroImages[galleryImageNumber];
        hiddenGallerySlide.classList.add("isVisible");
        visibleGallerySlide.classList.remove("isVisible");

        const previousSlide = visibleGallerySlide;
        visibleGallerySlide = hiddenGallerySlide;
        hiddenGallerySlide = previousSlide;

    }, 3500);
}
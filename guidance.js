/* Open and close the Guidance page pop-ups */
const guidanceButtons = document.querySelectorAll(".guidanceButton");
const guidanceModals = document.querySelectorAll(".guidanceModal");
const guidanceCloseButtons = document.querySelectorAll(".guidanceModalClose");

guidanceButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);

        if (modal) {
            modal.classList.add("isOpen");
            modal.setAttribute("aria-hidden", "false");
        }
    });
});

function closeGuidanceModal(modal) {
    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");
}

guidanceCloseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        closeGuidanceModal(button.closest(".guidanceModal"));
    });
});

/* Close when the dark area outside the white box is clicked */
guidanceModals.forEach(function (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeGuidanceModal(modal);
        }
    });
});

/* Close with the Escape key */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        guidanceModals.forEach(function (modal) {
            if (modal.classList.contains("isOpen")) {
                closeGuidanceModal(modal);
            }
        });
    }
});

/* Guidance hero image slideshow */
const guidanceImages = [
    "images/gallery1.jpg",
    "images/hero2.png",
    "images/jyotisar2.jpg",
    "images/kkr.png"
];

let guidanceImageNumber = 0;

let activeGuidanceSlide = document.getElementById("guidanceHeroImage");
let nextGuidanceSlide = document.getElementById("nextguidanceHeroImage");

if (activeGuidanceSlide && nextGuidanceSlide) {
    setInterval(function () {
        guidanceImageNumber =
            (guidanceImageNumber + 1) % guidanceImages.length;

        nextGuidanceSlide.src = guidanceImages[guidanceImageNumber];
        nextGuidanceSlide.classList.add("isVisible");
        activeGuidanceSlide.classList.remove("isVisible");

        const previousSlide = activeGuidanceSlide;
        activeGuidanceSlide = nextGuidanceSlide;
        nextGuidanceSlide = previousSlide;
    }, 3500);
}
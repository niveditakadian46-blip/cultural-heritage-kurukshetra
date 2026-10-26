const placeButtons = document.querySelectorAll(".placeReadMore");

placeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const contentId = button.getAttribute("aria-controls");
        const extraContent = document.getElementById(contentId);

        const isOpen = extraContent.classList.toggle("isOpen");

        button.setAttribute("aria-expanded", String(isOpen));
        button.textContent = isOpen ? "Read Less" : "Read More";
    });
});
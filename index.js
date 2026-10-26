// Find the menu controls.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const closeMenu = document.getElementById("closeMenu");
// Open or close the search box.
const searchToggle = document.getElementById("searchToggle");
const searchInput = document.getElementById("menuSearch");

// Open the menu.
menuToggle.addEventListener("click", function () {
    navLinks.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    closeMenu.focus();
});

// Close the menu and return focus to its button.
function hideMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
}

closeMenu.addEventListener("click", hideMenu);

// Also close the menu using the Escape key.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" &&
        navLinks.classList.contains("active")) {
        hideMenu();
    }
});

searchToggle.addEventListener("click", function () {
    searchInput.hidden = !searchInput.hidden;

    searchToggle.setAttribute(
        "aria-expanded",
        String(!searchInput.hidden)
    );

    if (!searchInput.hidden) {
        searchInput.focus();
    }
});

// Close the menu or search when clicking outside.
document.addEventListener("click", function (event) {
    const menu = document.getElementById("navLinks");
    const menuButton = document.getElementById("menuToggle");
    const searchBox = document.getElementById("menuSearch");
    const searchButton = document.getElementById("searchToggle");

    // Close the menu when the click is outside it.
    if (menu && menuButton &&
        !menu.contains(event.target) &&
        !menuButton.contains(event.target)) {

        menu.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    }

    // Close the search box when the click is outside it.
    if (searchBox && searchButton &&
        !searchBox.contains(event.target) &&
        !searchButton.contains(event.target)) {

        searchBox.hidden = true;
        searchButton.setAttribute("aria-expanded", "false");
    }
});

/* Hero images softly blend into each other */
const homeHeroImages = [
    "images/hero1.png",
    "images/hero2.png",
    "images/hero3.png",
    "images/hero4.png",
    "images/maxresdefault (1).jpg",
    "images/temple6.jpg",
    "images/planeterium.jpg"
];

let imageNumber = 0;
let activeSlide = document.getElementById("heroImage");
let hiddenSlide = document.getElementById("nextHeroImage");

if (activeSlide && hiddenSlide) {
    setInterval(function () {
        imageNumber = (imageNumber + 1) % heroImages.length;

        hiddenSlide.src = heroImages[imageNumber];
        hiddenSlide.classList.add("isVisible");
        activeSlide.classList.remove("isVisible");

        const previousSlide = activeSlide;
        activeSlide = hiddenSlide;
        hiddenSlide = previousSlide;

    }, 2000);
}

/* Search for a page when Enter is pressed */
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const searchWord = searchInput.value.trim().toLowerCase();

        const websitePages = Array.from(
            document.querySelectorAll("#navLinks a")
        );

        const matchingPage = websitePages.find(function (page) {
            return page.textContent.trim().toLowerCase()
                .includes(searchWord);
        });

        if (matchingPage && searchWord !== "") {
            window.location.href = matchingPage.href;
        } else {
            document.getElementById("searchMessage").textContent =
                "Sorry, this page is not available yet.";
        }
    }
});

const expandButton = document.getElementById("expandBtn");
const detailedText = document.getElementById("detailed");

if (expandButton && detailedText) {
    expandButton.addEventListener("click", function () {
        detailedText.hidden = !detailedText.hidden;

        if (detailedText.hidden) {
            expandButton.textContent = "READ MORE";
        } else {
            expandButton.textContent = "READ LESS";
        }
    });
}

/* Open and close Heritage Read more sections */
const heritageButtons = document.querySelectorAll(".heritageReadMore");

heritageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const extraContent = document.getElementById(
            button.getAttribute("aria-controls")
        );

        const isOpen = extraContent.classList.toggle("isOpen");

        button.setAttribute("aria-expanded", String(isOpen));
        button.textContent = isOpen ? "Read less" : "Read more";
    });
});

const heritageHeroImages = [
    "images/heritage1.webp",
    "images/kkr1.jpg",
    "images/importantPlaces1.png",
    "images/kkr4.png",
    "images/mata-bala-sundari-mandir.jpg",
    "images/museum.jpg",
    "images/Screenshot 2026-08-10 104014.png"
];

const heroImages = document.querySelector(".heritagePage")
    ? heritageHeroImages
    : homeHeroImages;

/* Create the Sign Up and Log In pop-up */
const accountPopup = document.createElement("section");

accountPopup.className = "accountPopup";
accountPopup.innerHTML = `
    <div class="accountPopupBox">
        <button type="button" class="accountPopupClose"
                aria-label="Close account pop-up">&times;</button>

        <h2 id="accountPopupTitle"></h2>

        <form id="accountForm">
            <label for="accountName">Full Name</label>
            <input type="text" id="accountName" required>

            <label for="accountEmail">Email</label>
            <input type="email" id="accountEmail" required>

            <label for="accountPassword">Password</label>
            <input type="password" id="accountPassword" required>

            <label class="notificationChoice">
                <input type="checkbox" id="accountNotifications">
                I would like to receive notifications and updates.
            </label>

            <button type="submit" class="button">Continue</button>
            <p id="accountFormMessage" role="status"></p>
        </form>
    </div>
`;

document.body.appendChild(accountPopup);

/* Open the correct account form */
const signupButton = document.getElementById("signupbutton");
const loginButton = document.getElementById("loginbutton");

const accountPopupTitle = document.getElementById("accountPopupTitle");
const accountPopupClose = document.querySelector(".accountPopupClose");
const accountForm = document.getElementById("accountForm");
const accountName = document.getElementById("accountName");
const accountNameLabel = document.querySelector('label[for="accountName"]');
const accountFormMessage = document.getElementById("accountFormMessage");

function openAccountPopup(type) {
    accountPopup.classList.add("isOpen");
    accountFormMessage.textContent = "";

    if (type === "signup") {
        accountPopupTitle.textContent = "Create Your Account";
        accountName.hidden = false;
        accountNameLabel.hidden = false;
        accountName.required = true;
    } else {
        accountPopupTitle.textContent = "Log In";
        accountName.hidden = true;
        accountNameLabel.hidden = true;
        accountName.required = false;
    }
}

if (signupButton) {
    signupButton.addEventListener("click", function () {
        openAccountPopup("signup");
    });
}

if (loginButton) {
    loginButton.addEventListener("click", function () {
        openAccountPopup("login");
    });
}

/* Close the pop-up */
accountPopupClose.addEventListener("click", function () {
    accountPopup.classList.remove("isOpen");
});

accountPopup.addEventListener("click", function (event) {
    if (event.target === accountPopup) {
        accountPopup.classList.remove("isOpen");
    }
});

/* Show a confirmation after submitting */
accountForm.addEventListener("submit", function (event) {
    event.preventDefault();

    accountFormMessage.textContent =
        "Thank you! Your details have been submitted successfully.";

    accountForm.reset();
});
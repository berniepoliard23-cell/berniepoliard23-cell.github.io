/* ============================= */
/* MOBILE NAVIGATION */
/* ============================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
    } else {
        menuToggle.innerHTML = "☰";
    }

});


/* ============================= */
/* CLOSE MOBILE MENU */
/* WHEN LINK IS CLICKED */
/* ============================= */

const navigationLinks = document.querySelectorAll(".nav-links a");


navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.innerHTML = "☰";

    });

});


/* ============================= */
/* NAVBAR SCROLL EFFECT */
/* ============================= */

const navbar = document.getElementById("Pearls-navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ============================= */
/* SCROLL REVEAL */
/* ============================= */

const revealElements = document.querySelectorAll(
    ".welcome-content, .experience-card, .reservation-content, .Pearl-footer-column, .Pearl"
);


/* ADD REVEAL CLASS */

revealElements.forEach(element => {

    element.classList.add("reveal");

});


function revealOnScroll() {

    const windowHeight = window.innerHeight;


    revealElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        const revealPoint = 100;


        if (elementTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


/* Run once when page loads */

revealOnScroll();


/* ============================= */
/* EXPERIENCE CARD CLICK EFFECT */
/* ============================= */

const experienceCards =
    document.querySelectorAll(".experience-card");


experienceCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("selected");

    });

});

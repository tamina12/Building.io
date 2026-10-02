/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 1500);
});


/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;

});


function animateCursor() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* Cursor hover */

const interactiveElements = document.querySelectorAll(
    "a, button, .project, .expertise-item"
);

interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        follower.style.width = "65px";
        follower.style.height = "65px";

    });

    element.addEventListener("mouseleave", () => {

        follower.style.width = "36px";
        follower.style.height = "36px";

    });

});


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach((link) => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".intro-grid, .project, .statement h2, .about-grid, .expertise-item, .contact-content"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   PROJECT IMAGE PARALLAX
========================= */

const projectImages = document.querySelectorAll(".project-image");

window.addEventListener("scroll", () => {

    projectImages.forEach((image) => {

        const rect = image.getBoundingClientRect();

        const visible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;

        if (visible) {

            const movement =
                (window.innerHeight / 2 - rect.top) * 0.015;

            const inner = image.querySelector("::before");

            image.style.setProperty(
                "--parallax",
                `${movement}px`
            );

        }

    });

});


/* =========================
   MAGNETIC HERO LINK
========================= */

const heroLink = document.querySelector(".hero-link");

if (heroLink) {

    heroLink.addEventListener("mousemove", (event) => {

        const rect = heroLink.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        heroLink.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

    });


    heroLink.addEventListener("mouseleave", () => {

        heroLink.style.transform = "translate(0, 0)";

    });

}


/* =========================
   SMOOTH ANCHOR OFFSET
========================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================
   DYNAMIC YEAR
========================= */

const yearElements = document.querySelectorAll(".current-year");

yearElements.forEach((element) => {

    element.textContent = new Date().getFullYear();

});

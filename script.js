document.querySelectorAll(".image-placeholder img").forEach((image) => {
    image.loading = "lazy";
});

const currentYear = document.querySelector(".current-year");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

document.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("pointerenter", () => {
        card.classList.add("is-flipped");
    });

    card.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            return;
        }

        card.classList.toggle("is-flipped");
    });
});

const revealElements = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (revealElements.length && !prefersReducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("has-scroll-reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach((element) => revealObserver.observe(element));
}

const siteVanta = document.querySelector("#site-vanta");
if (siteVanta && !prefersReducedMotion && window.VANTA) {
    window.VANTA.BIRDS({
        el: siteVanta,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x17151a,
        color1: 0xff4f9a,
        color2: 0xff9b45,
        quantity: 3
    });
}

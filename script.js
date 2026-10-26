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

const projectDetailDialog = document.querySelector(".project-detail-dialog");
if (projectDetailDialog instanceof HTMLDialogElement) {
    const projectDetailTitle = projectDetailDialog.querySelector("#project-detail-title");
    const projectDetailDescription = projectDetailDialog.querySelector(".project-detail-description");
    const projectDetailTechnologies = projectDetailDialog.querySelector(".project-detail-technologies");
    const projectDetailClose = projectDetailDialog.querySelector(".project-detail-close");

    if (
        projectDetailTitle instanceof HTMLElement &&
        projectDetailDescription instanceof HTMLElement &&
        projectDetailTechnologies instanceof HTMLElement &&
        projectDetailClose instanceof HTMLButtonElement
    ) {
        document.querySelectorAll("[data-project-details]").forEach((button) => {
            button.addEventListener("click", () => {
                projectDetailTitle.textContent = button.dataset.title ?? "";
                projectDetailDescription.textContent = button.dataset.description ?? "";
                projectDetailTechnologies.textContent = `Code gebruikt: ${button.dataset.technologies ?? ""}`;
                projectDetailDialog.showModal();
            });
        });

        projectDetailClose.addEventListener("click", () => projectDetailDialog.close());
        projectDetailDialog.addEventListener("click", (event) => {
            if (event.target === projectDetailDialog) {
                projectDetailDialog.close();
            }
        });
    }
}

const projectPreviewDialog = document.querySelector(".project-preview-dialog");
if (projectPreviewDialog instanceof HTMLDialogElement) {
    const projectPreviewFrame = projectPreviewDialog.querySelector(".project-preview-frame");
    const projectPreviewClose = projectPreviewDialog.querySelector(".project-detail-close");

    if (projectPreviewFrame instanceof HTMLIFrameElement && projectPreviewClose instanceof HTMLButtonElement) {
        document.querySelectorAll("[data-project-preview]").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                projectPreviewFrame.src = link.getAttribute("href") ?? "about:blank";
                projectPreviewDialog.showModal();
            });
        });

        projectPreviewClose.addEventListener("click", () => projectPreviewDialog.close());
        projectPreviewDialog.addEventListener("click", (event) => {
            if (event.target === projectPreviewDialog) {
                projectPreviewDialog.close();
            }
        });
        projectPreviewDialog.addEventListener("close", () => {
            projectPreviewFrame.src = "about:blank";
        });
    }
}

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

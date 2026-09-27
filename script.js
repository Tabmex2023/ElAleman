document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       HEADER & FOOTER LADEN
    ========================================== */

    const headerContainer = document.getElementById("site-header");
    const footerContainer = document.getElementById("site-footer");

    if (headerContainer) {
        fetch("header.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Header konnte nicht geladen werden.");
                }
                return response.text();
            })
            .then(html => {
                headerContainer.innerHTML = html;
                initializeHeader();
            })
            .catch(error => {
                console.error(error);
            });
    }

    if (footerContainer) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Footer konnte nicht geladen werden.");
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;

                const year = document.getElementById("current-year");

                if (year) {
                    year.textContent = new Date().getFullYear();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    /* ==========================================
       HEADER
    ========================================== */

    function initializeHeader() {

        const header = document.getElementById("site-header");
        const menuToggle = document.getElementById("menu-toggle");
        const nav = document.querySelector(".main-nav");

        if (!header) return;


        /* --------------------------------------
           SCROLL EFFECT
        -------------------------------------- */

        function handleScroll() {

            if (window.scrollY > 40) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        }

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true
        });


        /* --------------------------------------
           AKTIVE SEITE
        -------------------------------------- */

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .replace(".html", "") || "index";

        const navLinks = document.querySelectorAll(
            ".main-nav a[data-page]"
        );

        navLinks.forEach(link => {

            if (link.dataset.page === currentPage) {
                link.classList.add("active");
            }

        });


        /* --------------------------------------
           MOBILE MENU
        -------------------------------------- */

        if (menuToggle && nav) {

            menuToggle.addEventListener("click", () => {

                const isOpen =
                    menuToggle.getAttribute("aria-expanded") === "true";

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );

                nav.classList.toggle("open");

                document.body.classList.toggle(
                    "menu-open"
                );

            });


            /* Menü nach Klick auf Link schließen */

            nav.querySelectorAll("a").forEach(link => {

                link.addEventListener("click", () => {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    nav.classList.remove("open");

                    document.body.classList.remove(
                        "menu-open"
                    );

                });

            });

        }

    }


    /* ==========================================
       SCROLL REVEAL
    ========================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .image-reveal"
    );

    if (revealElements.length) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    }


    /* ==========================================
       SMOOTH SCROLL
    ========================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(anchor => {

        anchor.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ==========================================
       REDUCED MOTION
    ========================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (prefersReducedMotion) {
        document.documentElement.classList.add(
            "reduced-motion"
        );
    }

});

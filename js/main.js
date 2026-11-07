// Show a greeting based on the time of day (only on pages that have it)
const greeting = document.getElementById("greeting");

if (greeting) {
    const hour = new Date().getHours();
    let message = "Good Evening, Welcome!";

    if (hour < 12) {
        message = "Good Morning, Welcome!";
    } else if (hour < 18) {
        message = "Good Afternoon, Welcome!";
    }

    greeting.textContent = message;
}

// Update the footer year automatically
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// Toggle the mobile navigation menu
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const siteNavigation = document.getElementById("site-navigation");

if (siteHeader && menuToggle && siteNavigation) {
    const setMenuOpen = (isOpen) => {
        siteHeader.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    };

    menuToggle.addEventListener("click", () => {
        setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    siteNavigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            setMenuOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            setMenuOpen(false);
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

    // Smooth scrolling for internal links
    const smoothScrollLinks = document.querySelectorAll("a[href^='#']");
    smoothScrollLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 60,
                    behavior: "smooth"
                });
            }
        });
    });

    // Adjust hero section height dynamically
    function adjustHeroHeight() {
        const hero = document.querySelector(".hero");
        if (hero) {
            hero.style.height = window.innerHeight + "px";
        }
    }
    adjustHeroHeight();
    window.addEventListener("resize", adjustHeroHeight);
});

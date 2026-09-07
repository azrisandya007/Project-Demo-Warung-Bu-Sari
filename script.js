/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if(!loader) return;
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
});

/* ==========================================
   NAVBAR SCROLL EFFECT
========================================== */

const navbar = document.querySelector(".navbar");

if(navbar){
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

/* ==========================================
   ACTIVE NAV LINK
========================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

if(sections.length && navLinks.length){
    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if(pageYOffset >= sectionTop){
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    });
}

/* ==========================================
   DARK MODE
========================================== */

const themeBtn = document.getElementById("theme-btn");
const body = document.body;

if(themeBtn){
    const icon = themeBtn.querySelector("i");
    const storageKey = "theme-" + (body.dataset.site || "site");

    if(localStorage.getItem(storageKey) === "dark"){
        body.classList.add("dark");
        icon.className = "fa-solid fa-sun";
    }

    themeBtn.addEventListener("click", () => {
        body.classList.toggle("dark");
        if(body.classList.contains("dark")){
            localStorage.setItem(storageKey, "dark");
            icon.className = "fa-solid fa-sun";
        }else{
            localStorage.setItem(storageKey, "light");
            icon.className = "fa-solid fa-moon";
        }
    });
}

/* ==========================================
   HAMBURGER MENU
========================================== */

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".nav-menu");

if(hamburger && menu){
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });
}

/* ==========================================
   TYPING EFFECT
   Reads words from data-words="A,B,C" on #typing
========================================== */

const typing = document.getElementById("typing");

if(typing){
    const words = (typing.dataset.words || "").split(",").map(w => w.trim()).filter(Boolean);

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect(){
        if(!words.length) return;
        const currentWord = words[wordIndex];

        if(!deleting){
            typing.textContent = currentWord.substring(0, charIndex++);
            if(charIndex > currentWord.length){
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }
        }else{
            typing.textContent = currentWord.substring(0, charIndex--);
            if(charIndex < 0){
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeEffect, deleting ? 45 : 90);
    }

    typeEffect();
}

/* ==========================================
   SCROLL REVEAL
========================================== */

const reveals = document.querySelectorAll(".section");

function reveal(){
    const windowHeight = window.innerHeight;
    reveals.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if(top < windowHeight - 120){
            item.classList.add("active");
        }
    });
}

reveals.forEach(item => item.classList.add("reveal"));
window.addEventListener("scroll", reveal);
reveal();

/* ==========================================
   BACK TO TOP
========================================== */

const topBtn = document.getElementById("topBtn");

if(topBtn){
    window.addEventListener("scroll", () => {
        topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e){
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/* ==========================================
   HERO PARALLAX (only if a real image is present)
========================================== */

const heroImage = document.querySelector(".hero-image img");

if(heroImage){
    window.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 45;
        const y = (window.innerHeight / 2 - e.pageY) / 45;
        heroImage.style.transform = `translate(${x}px,${y}px)`;
    });
}

/* ==========================================
   SHOWCASE CARD HOVER GLOW
========================================== */

document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-soft), var(--surface) 60%)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.background = "var(--surface)";
    });
});

/* ==========================================
   SKILL / FEATURE CARD FLOAT
========================================== */

document.querySelectorAll(".skills-grid .card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.03)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});
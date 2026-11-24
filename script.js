// script.js — меню-гамбургер, таби, модальне вікно та слайдери Swiper

// ===== Гамбургер-меню =====
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

if (hamburger && mobileMenu) {
    function setMenu(open) {
        hamburger.classList.toggle("active", open);
        mobileMenu.classList.toggle("active", open);
        hamburger.setAttribute("aria-expanded", open);
        // забороняємо прокрутку сторінки під відкритим меню
        document.body.style.overflow = open ? "hidden" : "auto";
    }

    hamburger.addEventListener("click", () => {
        // toggle додає клас, якщо його немає, і забирає, якщо є
        setMenu(!mobileMenu.classList.contains("active"));
    });

    // клік по пункту меню закриває його
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    // якщо вікно розтягнули до ПК — закриваємо мобільне меню
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) setMenu(false);
    });
}

// ===== Таби (вкладки) =====
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        // 1. Прибираємо клас active у всіх кнопок і блоків
        tabBtns.forEach((item) => item.classList.remove("active"));
        tabContents.forEach((item) => item.classList.remove("active"));

        // 2. Додаємо клас active поточній кнопці
        btn.classList.add("active");

        // 3. Знаходимо блок, який відповідає кнопці, і показуємо його
        const tabId = btn.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
    });
});

// ===== Модальне вікно =====
const modal = document.getElementById("my-modal");
const openBtn = document.getElementById("open-modal-btn");
const closeBtn = document.querySelector(".close-modal");

if (modal && openBtn && closeBtn) {
    const modalForm = modal.querySelector("form");
    const modalSuccess = modal.querySelector(".modal-success");

    function openModal() {
        modalForm.reset();
        modalForm.hidden = false;
        modalSuccess.hidden = true;
        modal.classList.add("open");
    }

    function closeModal() {
        modal.classList.remove("open");
    }

    // Відкрити
    openBtn.addEventListener("click", openModal);

    // Закрити (хрестик)
    closeBtn.addEventListener("click", closeModal);

    // Закрити (клік поза вікном)
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрити (клавіша Esc)
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    // Відправка форми: показуємо повідомлення про успіх і закриваємо вікно
    modalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        modalForm.hidden = true;
        modalSuccess.hidden = false;
        setTimeout(closeModal, 2000);
    });
}

// ===== Слайдери Swiper (працюють лише на сторінках, де підключено Swiper) =====
if (typeof Swiper !== "undefined") {

    // Hero-банер: 1 слайд, текст з'являється з ефектом fade-in-up (CSS)
    if (document.querySelector(".heroSwiper")) {
        const heroSwiper = new Swiper(".heroSwiper", {
            loop: true,
            slidesPerView: 1,
            navigation: {
                nextEl: ".heroSwiper .swiper-button-next",
                prevEl: ".heroSwiper .swiper-button-prev",
            },
            pagination: {
                el: ".heroSwiper .swiper-pagination",
                clickable: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
        });
    }

    // Відгуки покупців
    if (document.querySelector(".mySwiper")) {
        const swiper = new Swiper(".mySwiper", {
            loop: true,           // безкінечна прокрутка
            slidesPerView: 1,     // за замовчуванням (мобільний) — 1 слайд
            spaceBetween: 30,     // відступ між слайдами

            // стрілки навігації
            navigation: {
                nextEl: ".mySwiper .swiper-button-next",
                prevEl: ".mySwiper .swiper-button-prev",
            },

            // крапочки (пагінація)
            pagination: {
                el: ".mySwiper .swiper-pagination",
                clickable: true,
            },

            // автопрокрутка
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },

            // адаптивність
            breakpoints: {
                640: {
                    slidesPerView: 2,   // планшет
                },
                1024: {
                    slidesPerView: 3,   // десктоп
                },
            },
        });
    }
}

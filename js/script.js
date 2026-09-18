// ДЛЯ МОБИЛЬНОГО МЕНЮ
const burger = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-drawer');


 // МОБИЛЬНОЕ МЕНЮ
if  (burger) {
    burger.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
}

  // ИНИЦИАЛИЗАЦИЯ SWIPER
    const swiperReviews = new Swiper('.swiper-reviews', {
        loop: false, // Включаем бесконечный режим
        spaceBetween: 24, // Расстояние между карточками отзыва
        speed: 400, // Скорость перелистывания по клику в мс

        // Подключаем ваши стрелочки из HTML по ID
        navigation: {
            nextEl: '#btn-review-next',
            prevEl: '#btn-review-prev',
        },

        // Подключаем кастомный счетчик цифр
        pagination: {
            el: '.swiper-pagination-custom',
            type: 'fraction', // Режим fraction автоматически генерирует строку вида "1 / 5"
        },

        // Настройка сетки для разных мониторов
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        }
    });

    const swiperGallery = new Swiper('.swiper-gallery', {
        loop: true,
        breakpoints: {
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
        },

        spaceBetween: 20,

        speed: 4000,

        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
    });

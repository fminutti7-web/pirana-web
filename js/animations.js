const animatedElements = document.querySelectorAll(
    '.profile__card, .portfolio__item, .location__block, .cta__container, .cta-turno, .banner__separador, .profile__heading, .location__heading, .footer__col'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach((el, index) => {
    // Delay escalonado automático según posición en el DOM
    if (el.closest('.header')) return;
    
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
});


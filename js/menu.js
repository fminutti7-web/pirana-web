// Seleccionamos los elementos
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('.header__nav');

// Click en el botón
burger.addEventListener('click', () => {

    // Guardamos el estado actual antes de cambiar
    const isOpen = nav.classList.contains('active');

    // Toggle en ambos elementos
    burger.classList.toggle('active');
    nav.classList.toggle('active');

    // Actualizamos accesibilidad
    burger.setAttribute('aria-expanded', !isOpen);
});

// Cerrar al hacer click en cualquier link del menú
nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', false);
    });
});
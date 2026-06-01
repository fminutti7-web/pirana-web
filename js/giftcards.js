document.addEventListener('DOMContentLoaded', () => {
const botones = document.querySelectorAll('.gift-card__btn');

botones.forEach((btn) => {
    btn.addEventListener('click', async () => {
    const titulo = btn.dataset.titulo;
    const precio = btn.dataset.precio;
    const tipo = btn.dataset.tipo;

    btn.disabled = true;
    btn.textContent = 'Procesando...';

    try {
        const res = await fetch('/api/crear-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, precio, tipo }),
        });

        const data = await res.json();

        if (data.init_point) {
        window.location.href = data.init_point;
        } else {
        alert('Hubo un error al procesar el pago. Intentá de nuevo.');
        btn.disabled = false;
        btn.textContent = 'Comprar';
        }
    } catch (err) {
        console.error(err);
        alert('Error de conexión. Intentá de nuevo.');
        btn.disabled = false;
        btn.textContent = 'Comprar';
    }
    });
});
});
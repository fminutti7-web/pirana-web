document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('gcModal');
  const modalTitulo = modal.querySelector('.gc-modal__titulo');
  const modalPrecio = modal.querySelector('.gc-modal__precio');
  const btnPagar = modal.querySelector('.gc-modal__pagar');
  const btnCancelar = modal.querySelector('.gc-modal__cancelar');
  const btnClose = modal.querySelector('.gc-modal__close');
  const overlay = modal.querySelector('.gc-modal__overlay');
  const inputDestinatario = modal.querySelector('input[name="destinatario"]');
  const inputMensaje = modal.querySelector('textarea[name="mensaje"]');

  let cardActual = null;

  // Abrir modal al click en Comprar
  document.querySelectorAll('.gift-card__btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      cardActual = {
        titulo: btn.dataset.titulo,
        precio: btn.dataset.precio,
        tipo: btn.dataset.tipo,
      };

      modalTitulo.textContent = btn.dataset.titulo;
      modalPrecio.textContent = `$${Number(btn.dataset.precio).toLocaleString('es-AR')}`;
      inputDestinatario.value = '';
      inputMensaje.value = '';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Cerrar modal
  function cerrarModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    cardActual = null;
  }

  btnCancelar.addEventListener('click', cerrarModal);
  btnClose.addEventListener('click', cerrarModal);
  overlay.addEventListener('click', cerrarModal);

  // Escape cierra el modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarModal();
  });

  // Ir al pago
  btnPagar.addEventListener('click', async () => {
    if (!cardActual) return;

    const destinatario = inputDestinatario.value.trim();
    const mensaje = inputMensaje.value.trim();

    btnPagar.disabled = true;
    btnPagar.textContent = 'Procesando...';

    try {
        const res = await fetch('/api/crear-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        titulo: cardActual.titulo,
        precio: cardActual.precio,
        tipo: cardActual.tipo,
        destinatario,
        mensaje,
        }),
    });

    const data = await res.json();

    if (data.init_point) {
        window.location.href = data.init_point;
    } else {
        alert('Error al procesar el pago. Intentá de nuevo.');
        btnPagar.disabled = false;
        btnPagar.textContent = 'Ir al pago →';
    }
    } catch (err) {
    console.error(err);
    alert('Error de conexión.');
    btnPagar.disabled = false;
    btnPagar.textContent = 'Ir al pago →';
    }
});
});
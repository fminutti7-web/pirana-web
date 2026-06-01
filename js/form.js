const form = document.querySelector('.form-box');
const submitBtn = form.querySelector('input[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // evita que recargue la página

    // Leemos los valores
    const nombre = form.querySelector('input[name="nombre"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const mensaje = form.querySelector('textarea[name="mensaje"]').value.trim();

    // Validación básica
    if (!nombre || !email || !mensaje) {
        alert('Por favor completá todos los campos');
        return;
    }

    // Estado loading
    submitBtn.value = 'Enviando...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, mensaje })
        });

        const data = await response.json();

        if (response.ok) {
            submitBtn.value = '¡Mensaje enviado!';
            form.reset();
            setTimeout(() => {
                submitBtn.value = 'Enviar';
                submitBtn.disabled = false;
            }, 3000);
        } else {
            throw new Error(data.error);
        }

    } catch (error) {
        submitBtn.value = 'Error al enviar';
        submitBtn.disabled = false;
        setTimeout(() => {
            submitBtn.value = 'Enviar';
        }, 3000);
    }
});
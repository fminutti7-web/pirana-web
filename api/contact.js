import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { nombre, email, mensaje } = req.body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        await resend.emails.send({
            from: 'Piraña Web <onboarding@resend.dev>',
            to: 'cap.jamaica13@gmail.com', // ← tu email para recibir los mensajes
            subject: `Nueva consulta de ${nombre}`,
            html: `
                <h2>Nueva consulta desde la web</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong> ${mensaje}</p>
            `,
        });

        return res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
}
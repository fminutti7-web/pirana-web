export default async function handler(req, res) {
if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
}

const { titulo, precio, tipo } = req.body;

if (!titulo || !precio || !tipo) {
    return res.status(400).json({ error: 'Faltan datos' });
}

const body = {
    items: [
    {
        title: titulo,
        quantity: 1,
        unit_price: Number(precio),
        currency_id: 'ARS',
    },
    ],
    back_urls: {
    success: `https://pirana-web.vercel.app/success.html`,
    failure: `https://pirana-web.vercel.app/error.html`,
    pending: `https://pirana-web.vercel.app/success.html`,
    },
    auto_return: 'approved',
    statement_descriptor: 'PIRANA STUDIO',
    external_reference: `${tipo}-${Date.now()}`,
};

try {
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
    console.error('MP error:', data);
    return res.status(500).json({ error: 'Error creando preferencia', detalle: data });
    }

    return res.status(200).json({ init_point: data.init_point });
} catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Error interno' });
}
}
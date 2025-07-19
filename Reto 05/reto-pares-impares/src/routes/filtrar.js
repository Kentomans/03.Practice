import express from "express";
import separarParesImpares from "../utils/separarParesImpares.js";


const router = express.Router();

router.get('/filtrar', (req, res) => {
    const numerosStr = req.query.numeros;
    const only = req.query.only;
    const unique = req.query.unique === 'true';


    if (!numerosStr || !numerosStr.trim()) {
        return res.status(400).json({ error: 'faltan parametros en la ruta' })
    };

    const numeros = numerosStr.split(',');

    const convertidos = [];
    const invalidos = [];


    for (let i = 0; i < numeros.length; i++) {
        const convertido = Number(numeros[i]);
        if (isNaN(convertido)) {
            invalidos.push(numeros[i]);
        }
        convertidos.push(convertido);
    }

    if (invalidos.length > 0) {
        return res.status(400).json({ error: `${invalidos} no es valido(s).` });
    }

    let numerosUnicos = convertidos;
    if (unique) {
        numerosUnicos = [...new Set(numerosUnicos)]
    }

    const { pares, impares } = separarParesImpares(numerosUnicos);

    const message = {
        original: convertidos,
    }

    if (only === 'pares') {
        message.pares = pares;
    } else if (only === 'impares') {
        message.impares = impares;
    } else {
        message.pares = pares;
        message.impares = impares;
    }

    res.json(message);


});

export default router;
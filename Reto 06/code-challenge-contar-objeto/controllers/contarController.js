

export function contarPropiedades(req, res) {
    
        const objeto = req.body;
        const detalles = req.query.detallado === 'true';

        if (!objeto || typeof objeto !== "object" || Array.isArray(objeto)) {
            return res.status(400).json({ error: "Se esperaba un objeto JSON válido" });
        }

        const claves = Object.keys(objeto);
        const cantidad = claves.length;


        if (detalles) {
            return res.json({
                propiedades: cantidad,
                detalles: claves
            })
        } else {
            return res.json({ propiedades: cantidad });
        }
    

}




export default contarPropiedades;
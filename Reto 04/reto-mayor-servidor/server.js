import http from 'http';
import encontrarMayor from './utils/encontrarMayor.js';

const PORT = 3000;

const server = http.createServer((req, res) => {

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);;


    if (parsedUrl.pathname === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end("Bienvenido a la API");
    }



    if (parsedUrl.pathname === '/mayor' && req.method === 'GET') {
        const numerosParam = parsedUrl.searchParams.get('numeros');

        if (!numerosParam || !numerosParam.trim()) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'No se recibio ningun numero' }));
        }

        if (!numerosParam.includes(',')) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Los numeros deben estar separados por: ´,´' }));
        }

        const numeros = numerosParam.split(',');


        const may = encontrarMayor(numeros);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(may));
    }


    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));

});


server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
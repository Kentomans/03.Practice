import http from "http";
import { invertirCadena } from "./utils/invertir.js";
import { palindromo } from "./utils/palindromo.js";
import { verificarNumText } from "./utils/verificar.js";


const server = http.createServer((req, res) => {
  const { method, url } = req;

 
  if (url === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end("Welcome to your API");
  }

  
  if (method === 'GET' && url.startsWith('/invertir')) {
    const reqUrl = new URL(url, `http://${req.headers.host}`);
    const texto = reqUrl.searchParams.get('texto');

    if (texto) {
      const textoInvertido = invertirCadena(texto);
      const verifi = verificarNumText(texto);
      const pal = palindromo(texto);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ Original: texto, Invertido: textoInvertido, EsNumero: verifi, Palindromo: pal }));
    } else {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Parámetro "texto" requerido');
    }
  }

 
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Ruta no encontrada');
});

server.listen(3000, () => {
  console.log("Server running in port 3000");
});

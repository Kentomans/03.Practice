import express from 'express';
import routes from './src/routes/Index.js';

const app = express();
const PORT = 3000;


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a tu api!");
});

app.use("/", routes);


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido en la solicitud' });
  }
  next();
});


app.listen(PORT, ()=>{
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
import express from 'express';
import routes from './routes/index.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
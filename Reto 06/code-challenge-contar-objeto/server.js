import express from 'express';
import routes from './routes/contadorRoutes.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to your API');
});

app.use(routes);

app.use(( req, res) => {
    return res.status(400).json({ error: 'JSON inválido en la solicitud' });
});


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
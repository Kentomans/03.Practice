import express from 'express';
import routes from './src/routes/index.js';
import dbConnection from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
dbConnection();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('welcome to you API')
});

app.use('/api', routes);

app.use((req, res) => {
   res.status(404).send('Not found');
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
});
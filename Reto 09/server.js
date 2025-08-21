import express from 'express';
import sequelize from './src/config/database.js';
import dotenv from 'dotenv';
import routes from './src/routes/index.js';
import {Author, Book, Review} from './src/models/indexReferences.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);
app.use((req, res) => res.status(404).send('Not found'));

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Tables synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Unable to connect to database', error);
  });
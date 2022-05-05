import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.use(
  cors({
    origin: '*', // endereço do frontend que vai acessar
  })
);
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});

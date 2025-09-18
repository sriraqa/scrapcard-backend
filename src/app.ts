// import express from 'express';

import express from 'express';
import usersRouter from './routes/users';
import { connectToDatabase } from './db';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

async function startServer() {
  await connectToDatabase();
  app.use('/user', usersRouter);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
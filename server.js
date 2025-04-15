import express from 'express';
import { grantRootAccess } from './grant-root-access.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/grant-root-access', grantRootAccess);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
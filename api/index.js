import express from 'express';
import setupControllers from './controllers/entry.js';

export const app = express();
app.use(express.json());

setupControllers(app);

app.listen(3001, () => {
    console.log('🚀 Launching...')
})

export default app;
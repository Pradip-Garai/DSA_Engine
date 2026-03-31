import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes.js';
dotenv.config();

const PORT =  5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/apis', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});

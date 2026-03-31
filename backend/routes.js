import express from 'express';
import main from './chat.js';
const router = express.Router();

router.post("/chat", main);

export default router;
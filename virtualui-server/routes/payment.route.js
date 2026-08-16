import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { addCredits } from '../controllers/payment.controller.js';

const paymentRouter = express.Router();

// POST /api/payment/add-credits
paymentRouter.post('/add-credits', isAuth, addCredits);

export default paymentRouter;
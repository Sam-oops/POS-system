import express from 'express';
import authRouter from './routes/auth';

export const app = express();

app.use(express.json());

// NOTE (Stage 5): the payment webhook must verify an HMAC signature over the
// RAW request body. express.json() above would parse/alter it, so the webhook
// route needs express.raw() mounted BEFORE this global parser sees it. We'll
// wire that up when we build POST /api/webhooks/payment.

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Stage routers get mounted here as we build them:
app.use('/api/auth', authRouter); // Stage 1
//   app.use('/api/products', productRouter);  // Stage 2
//   app.use('/api/orders', orderRouter);      // Stage 4
//   app.use('/api/webhooks', webhookRouter);  // Stage 5
//   app.use('/api/reports', reportRouter);    // Stage 7

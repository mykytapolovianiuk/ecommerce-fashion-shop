import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Create PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body || {};
    if (!amount || typeof amount !== 'number' || amount < 50) {
      return res.status(400).json({ error: 'Invalid amount (must be cents, e.g. $10.00 => 1000)' });
    }

    const pi = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true }
    });

    return res.json({ clientSecret: pi.client_secret });
  } catch (err) {
    console.error('[Stripe PI error]', err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
  console.log(`   Allowed origin: ${ALLOWED_ORIGIN}`);
});

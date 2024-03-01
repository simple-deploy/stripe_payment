// pages/api/invoices.js

import Stripe from 'stripe';

const stripe = new Stripe('your_stripe_secret_key', {
  apiVersion: '2020-08-27', // Specify your desired Stripe API version
});

export default async function handler(req, res) {
  try {
    const invoices = await stripe.invoices.list({ limit: 10 }); // Fetching the last 10 invoices as an example
    res.status(200).json({ invoices: invoices.data });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Error fetching invoices' });
  }
}

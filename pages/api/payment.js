import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';

const stripeSecretKey = 'sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2';
const stripeClient = new stripe(stripeSecretKey, {
    apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { amount, currency, payment_method } = req.body;

            const intent = await stripeClient.paymentIntents.create({
                amount,
                currency,
                payment_method,
                confirmation_method: 'manual',
                confirm: true,
            });

            res.status(200).json({ client_secret: intent });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}

import { useState } from 'react';

const PaymentForm = () => {
    const [amount, setAmount] = useState(1000);
    const [currency, setCurrency] = useState('usd');

    const handlePayment = async () => {
        const paymentIntentUrl = 'https://api.stripe.com/v1/payment_intents';

        const paymentMethodTypes = ['card'];

        const requestBody = new URLSearchParams();
        requestBody.append('amount', amount);
        requestBody.append('currency', currency);
        paymentMethodTypes.forEach(type => {
            requestBody.append('payment_method_types[]', type);
        });

        try {
            const response = await fetch(paymentIntentUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
                },
                body: requestBody,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('PaymentIntent created:', result);
            } else {
                console.error('Error creating PaymentIntent:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating PaymentIntent:', error);
        }
    };

    return (
        <div>
            <label>
                Amount:
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>
            <br />
            <label>
                Currency:
                <input
                    type="string"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                />
            </label>
            <br />
            <button onClick={handlePayment}>Make Payment</button>
        </div>
    );
};

export default PaymentForm;

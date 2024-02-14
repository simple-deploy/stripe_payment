import { useState } from 'react';
import axios from 'axios';

const PaymentIntentConfirmation = () => {
  const [paymentMethod, setPaymentMethod] = useState('pm_card_visa');

  const handlePaymentConfirmation = async () => {
    try {
      const response = await axios.post(
        'https://api.stripe.com/v1/payment_intents/pi_3OcgFDEIh7QF36ee1SxsbDBr/confirm',
        new URLSearchParams({ payment_method: paymentMethod }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
          },
        }
      );

      console.log('Payment Intent confirmed:', response.data);
    } catch (error) {
      console.error('Error confirming Payment Intent:', error.message);
    }
  };

  return (
    <div>
      <label>
        Payment Method:
        <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
      </label>
      <button onClick={handlePaymentConfirmation}>Confirm Payment Intent</button>
    </div>
  );
};

export default PaymentIntentConfirmation;

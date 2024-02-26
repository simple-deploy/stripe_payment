import { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentLinks = () => {
  const [paymentLinks, setPaymentLinks] = useState([]);

  useEffect(() => {
    const fetchPaymentLinks = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/payment_intents', {
          headers: {
            'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });


        setPaymentLinks(record);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentLinks();
  }, []);

  return (
    <div>
      <h1>Payment Links Listing</h1>
      <ul>
        {paymentLinks.map((paymentLink) => (
          <li key={paymentLink.id}>
            Payment Link ID: {paymentLink.id}, Amount: {paymentLink.amount / 100} {paymentLink.currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentLinks;

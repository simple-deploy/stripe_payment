
import { useEffect, useState } from 'react';

const TransactionListing = () => {
  const [successfulPaymentIntents, setSuccessfulPaymentIntents] = useState([]);

  useEffect(() => {
    const fetchSuccessfulPaymentIntents = async () => {
      try {
        const response = await fetch('https://api.stripe.com/v1/payment_intents', {
          headers: {
            'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessfulPaymentIntents(data.data);
        } else {
          console.error('Failed to fetch successful payment intents from Stripe');
        }
      } catch (error) {
        console.error('Error fetching successful payment intents:', error);
      }
    };

    fetchSuccessfulPaymentIntents();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div>
      <h2>Successful Payment Intents</h2>
      <ul>
        {successfulPaymentIntents.map((paymentIntent) => (
          <li key={paymentIntent.id}>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionListing;

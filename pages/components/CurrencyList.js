import { useEffect, useState } from 'react';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2', {
  apiVersion: '2020-08-27', // Use the latest API version
});

const CurrencyList = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await stripe.currencies.list();
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, []);

  return (
    <div>
      <h1>Supported Currencies</h1>
      <ul>
        {currencies.map((currency) => (
          <li key={currency.id}>{currency.name} ({currency.code})</li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyList;

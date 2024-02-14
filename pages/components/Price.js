import React, { useState } from 'react';

const Price = () => {
  const [unitAmount, setUnitAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [response, setResponse] = useState(null);

  const handlePrice = async () => {
    try {
      const response = await fetch('https://api.stripe.com/v1/prices', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
            'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'cid=8fbf5b0b-c774-484a-bc01-ca8292e432b2',
        },
        body: new URLSearchParams({
          'product': 'prod_PT4vSS5rmg9bmA',
          'unit_amount': unitAmount,
          'currency': currency,
        }).toString(),
      });

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

  return (
    <div>
      <label>
        Unit Amount:
        <input
          type="text"
          value={unitAmount}
          onChange={(e) => setUnitAmount(e.target.value)}
        />
      </label>
      <br />
      <label>
        Currency:
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handlePrice}>Price API</button>

      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Price;

import React, { useState } from 'react';
import cors from 'cors';

const PaymentLink = () => {
  const [response, setResponse] = useState(null);

  const handleApiCall = async () => {
    try {
      const response = await fetch('https://buy.stripe.com/test_4gwbJT7V3dFc6086os', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie': 'cid=8fbf5b0b-c774-484a-bc01-ca8292e432b2',
        },
        body: new URLSearchParams({
          'line_items[][price]': 'price_1OeadeEIh7QF36eeFQaRgfFn',
          'line_items[][quantity]': '1',
          'payment_method_types[]': 'card',
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
      <button onClick={handleApiCall}>Payment Link API</button>

      {response && (
        <div>
          <h2>API Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentLink;

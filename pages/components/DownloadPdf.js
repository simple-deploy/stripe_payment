import { useEffect } from 'react';

const FinalizeInvoice = () => {
  useEffect(() => {
    const finalizeInvoice = async () => {
      const response = await fetch('https://api.stripe.com/v1/invoices/in_1OZQ2fEIh7QF36eejdcxJaQg/finalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic c2tfdGVzdF81MU9ZUjlhRUloN1FGMzZlZVI3WXc4YWVhUmFDWTNlR0N5eHdIQ09FN21YbUI4Nzd2U3lraTNHWE5KeVdtTExTSnVtV0taaWxrdHBmbHJDcmVKemNEV1JZWTAwZWF4RGFMQjI6',
          'Cookie': 'cid=8fbf5b0b-c774-484a-bc01-ca8292e432b2',
        },
      });

      if (response.ok) {
        console.log('Invoice finalized successfully');
      } else {
        console.error('Failed to finalize invoice:', await response.text());
      }
    };

    finalizeInvoice();
  }, []);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default FinalizeInvoice;

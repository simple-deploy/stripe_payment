import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

const StripeQRCode = () => {
  const [stripeQRCodeUrl, setStripeQRCodeUrl] = useState('');

  useEffect(() => {
    const stripeCheckoutUrl = 'https://buy.stripe.com/test_3cs01ba3bat074c7sE';
    const stripePublicKey = 'pk_test_51OYR9aEIh7QF36eeLH12HcYMA1KyzNBURTofGLRqsQt2f3xzwuz18svbjx35Pzqez59reGMCy5QJAaF9IPVhrhLm00MI2T9RPH';

    const amount = 1.00; 
    const currency = 'USD';
    const description = 'Payment Description';
    const stripeAccountID = null; 

    const fullUrl = `${stripeCheckoutUrl}?key=${stripePublicKey}&amount=${amount}&currency=${currency}&description=${description}${stripeAccountID ? `&account=${stripeAccountID}` : ''}`;

    setStripeQRCodeUrl(fullUrl);
  }, []);

  return (
    <div>
      <h1>Stripe QR Code</h1>
      {stripeQRCodeUrl && <QRCode value={stripeQRCodeUrl} />}
    </div>
  );
};

export default StripeQRCode;

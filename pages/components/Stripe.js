import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

const Stripe = () => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [unitAmount, setUnitAmount] = useState('');
    const [stripeQRCodeUrl, setStripeQRCodeUrl] = useState('');
    const [countrySpecs, setCountrySpecs] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    const handleAPICalls = async () => {
        try {
            const productResponse = await fetch('https://api.stripe.com/v1/products', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    name: productName,
                    type: productType,
                }),
            });
            const productData = await productResponse.json();

            const priceResponse = await fetch('https://api.stripe.com/v1/prices', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    product: productData.id,
                    unit_amount: unitAmount + '00',
                    currency: selectedCountry,
                }),
            });
            const priceData = await priceResponse.json();

            const paymentLinkResponse = await fetch('https://api.stripe.com/v1/payment_links', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    'line_items[][price]': priceData.id,
                    'line_items[][quantity]': '1',
                    'payment_method_types[]': 'card',
                }).toString(),
            });
            const paymentLinkData = await paymentLinkResponse.json();

            const paymentLinkDetailsResponse = await fetch(`https://api.stripe.com/v1/payment_links/${paymentLinkData.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const paymentLinkDetailsData = await paymentLinkDetailsResponse.json();

            console.log('Payment Link', paymentLinkDetailsData.url); // Handle the response data as needed

            const stripePublicKey = 'pk_test_51OYR9aEIh7QF36eeLH12HcYMA1KyzNBURTofGLRqsQt2f3xzwuz18svbjx35Pzqez59reGMCy5QJAaF9IPVhrhLm00MI2T9RPH';


            const description = 'Payment Description';
            const stripeAccountID = null;

            const fullUrl = `${paymentLinkDetailsData.url}?key=${stripePublicKey}&amount=${unitAmount}&currency=${selectedCountry}&description=${description}${stripeAccountID ? `&account=${stripeAccountID}` : ''}`;

            setStripeQRCodeUrl(fullUrl);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.stripe.com/v1/country_specs', {
                    headers: {
                        Authorization: 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                setCountrySpecs(response.data.data[0].supported_payment_currencies);
            } catch (error) {
                console.error('Error fetching country specs:', error);
            }
        };

        fetchData();
    }, []);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value.toLowerCase());
    };

    return (
        <div>
            <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Product Name" />
            <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="Product Type" />
            <input type="text" value={unitAmount} onChange={e => setUnitAmount(e.target.value)} placeholder="Unit Amount" />
            <br></br>
            <label htmlFor="country">Select Country:</label>
            <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countrySpecs && countrySpecs.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>

            <button onClick={handleAPICalls}>Submit</button>

            <h1>Stripe QR Code</h1>
            {stripeQRCodeUrl && <QRCode value={stripeQRCodeUrl} />}
        </div >
    );
};

export default Stripe;

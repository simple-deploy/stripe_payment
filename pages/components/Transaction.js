import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';

const Transaction = () => {
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

        console.log('response', response)

        const record = response.data.data.filter((record) => record.status == "succeeded");
        setPaymentLinks(record);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaymentLinks();
  }, []);

  const recordRefs = useRef([]);

  const downloadPDF = (index) => {
    const doc = new jsPDF();
    doc.text('Payment Transaction', 75, 10);
    doc.text(`Id: ${paymentLinks[index].id}`, 10, 20);
    doc.text(`Amount: ${paymentLinks[index].amount / 100 + paymentLinks[index].currency}`, 10, 30);
    doc.text(`Status: ${paymentLinks[index].status}`, 10, 40);
    doc.save(`transaction${index + 1}.pdf`);
  };

  return (
    <div>
      <h1>Payment Transactions</h1>
      {paymentLinks.map((paymentLink, index) => (
        <div key={index}>
          <ol key={paymentLink.id}>
            ID: {paymentLink.id}, Amount: {paymentLink.amount / 100} {paymentLink.currency}
            {/* <button onClick={() => downloadPDF(index)}>Download</button> */}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default Transaction;

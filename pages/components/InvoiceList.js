import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://api.stripe.com/v1/invoices', {
          headers: {
            'Authorization': 'Bearer sk_test_51OYR9aEIh7QF36eeR7Yw8aeaRaCY3eGCyxwHCOE7mXmB877vSyki3GXNJyWm0LSJumWKZilktpflrCreJzcDWRYY00eaxDaLB2',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        console.log('invoices', invoices);

        const succeededInvoices = response.data.data.filter((invoice) => invoice.status === 'paid');
        setInvoices(succeededInvoices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInvoices();
  }, []);

  const invoiceRefs = useRef([]);

  const downloadPDF = (index) => {
    const doc = new jsPDF();
    doc.text(`Invoice`, 10, 10);
  doc.text(`Invoice number ${invoices[index].id}`, 10, 20);
  doc.text(`Name ${invoices[index].account_name}`, 10, 30);
  doc.text(`Due date ${invoices[index].due_date}`, 10, 40);
  doc.text(`Name ${invoices[index].customer_name}`, 10, 50);
  doc.text(`Phone ${invoices[index].customer_phone}`, 10, 60);
  doc.text(`Email ${invoices[index].customer_email}`, 10, 70);
  doc.text(`Country ${invoices[index].customer_address.country}`, 10, 80);
  doc.text(`City ${invoices[index].customer_address.city}`, 10, 90);
  doc.text(`Postal Code ${invoices[index].customer_address.postal_code}`, 10, 100);
  doc.text(`Amount Paid ${invoices[index].amount_paid}`, 10, 110);
 
  doc.save(`invoice.pdf`);
  };

  return (
    <div>
      <h1>Invoice List</h1>
      {console.log('invoice',invoices)}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
  <thead>
    <tr>
      <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Invoice Number</th>
      <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Amount</th>
      <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Status</th>
      <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Action</th>
    </tr>
  </thead>
  <tbody>
    {invoices.map((invoice, index) => (
      <tr key={index}>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{invoice.id}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>${(invoice.amount_paid / 100).toFixed(2)} {invoice.currency}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{invoice.status}</td>
        <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
          <button onClick={() => downloadPDF(index)}>Download</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default InvoiceList;

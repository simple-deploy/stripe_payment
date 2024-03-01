import Stripe from './components/Stripe';
// import Transaction from './components/Transaction';
// import PdfGenerator from './components/PdfGenerator';
import InvoiceList from './components/InvoiceList';
import DownloadPdf from './components/DownloadPdf';


const Home = () => {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <Stripe />
      {/* <Transaction />
      <PdfGenerator /> */}
      <InvoiceList />
      {/* <DownloadPdf /> */}
    </div>
  );
};

export default Home;

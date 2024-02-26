import Stripe from './components/Stripe';
import CurrencyList from './components/CurrencyList';
import PaymentLink from './components/PaymentLink';

const Home = () => {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <Stripe />
      <PaymentLink />
    </div>
  );
};

export default Home;

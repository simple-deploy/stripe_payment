import Stripe from './components/Stripe';
import CurrencyList from './components/CurrencyList';

const Home = () => {
  return (
    <div>
      <h1>Stripe Payment</h1>
      <Stripe />
    </div>
  );
};

export default Home;

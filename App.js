import Main from './Main';
import { Provider } from "react-redux";
import { store } from './redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';

const stripeKey = "pk_test_51O9CW4CQopJEyogPuf3teZ4qjPQNSZj8CsZoF4d2iIrp8NBSZI0UHhj9LzdW7Yw0dHieRnJxeue9JfPbIiMYEWzq00kPKUOTX5";

export default function App() {
  return (
    <StripeProvider threeDSecureParams={{ backgroundColor: "#fff", timeout: 5 }} merchantIdentifier="e-commerce" publishableKey={stripeKey}>
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}

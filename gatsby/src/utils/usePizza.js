import { useContext, useState } from 'react';
import { navigate } from 'gatsby';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatMoney from './formatMoney';

export default function usePizza({ pizzas, values }) {
  // 1. Create some sate to hold our order
  // we got rid of this line cause we moved the state up to the provider
  // const [order, setOrder] = useState([]);
  // We access both our state and out updater function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [flash, setFlash] = useState(null);

  // 2. make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. make a function to remove things from order
  function removeFromOrder(index) {
    //  we need to do a new array with everything before the index we want to remove and everything after the index
    setOrder([
      ...order.slice(0, index),
      // if you don't specify second argument in slice method it goes until the end of the array
      ...order.slice(index + 1),
    ]);
  }
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    //  Gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      piegeacon: values.piegeacon,
    };
    // 4. send this data to a serverless function when order is checked out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // check if everything is ok
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn off loading state
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Order successfully placed!!');
      setFlash(true);
      setTimeout(() => {
        setFlash(false);
      }, 3000);
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 6000);
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    flash,
    submitOrder,
  };
}

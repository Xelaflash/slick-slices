import { useState } from 'react';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some sate to hold our order
  const [order, setOrder] = useState([]);
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
  // 4. send this data to a serverless function when order is checked out
  //  TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}

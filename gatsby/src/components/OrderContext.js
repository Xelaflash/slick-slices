import React, { useState } from 'react';

// create a order context
const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  // we need to stick the order state here (now it's in a lower level hook)
  const [order, setOrder] = useState([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderContext;

import React from 'react';

// this component is not exported because not used anywhere else in the app
function SinglePizza({ pizza }) {
  return <p>{pizza.name}</p>;
}

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

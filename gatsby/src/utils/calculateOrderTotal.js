import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  //  loop over each item in order
  const total = order.reduce((runningTotal, singleItem) => {
    const pizza = pizzas.find(
      (orderedPizza) => orderedPizza.id === singleItem.id
    );
    // calc the total for that pizza
    // add that to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleItem.size);
  }, 0);
  return total;
}

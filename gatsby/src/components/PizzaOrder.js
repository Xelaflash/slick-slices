import React from 'react';
import Img from 'gatsby-image';
import MenuItemsStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      <p>You have {order.length} items in your order!</p>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find(
          (orderedPizza) => orderedPizza.id === singleOrder.id
        );
        return (
          <MenuItemsStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
            <h2>
              {pizza.name} ({singleOrder.size})
            </h2>
            <p>
              {formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from your order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemsStyles>
        );
      })}
    </>
  );
}

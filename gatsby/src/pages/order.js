import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
// import FlashMessage from 'react-flash-message';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import usePizza from '../utils/usePizza';
import PizzaOrder from '../components/PizzaOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const styles = {
  alert: {
    left: '0',
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    background: 'green',
    color: 'white',
    fontSize: '1.8rem',
    width: '100%',
    zIndex: '1500',
  },
};

export default function OrderPage({ data }) {
  const pizzas = data.pizzas.nodes;
  const { values, updateValue } = useForm({
    // need to explicitly specify the default values of your fields
    name: '',
    email: '',
    piegeacon: '',
  });

  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
    flash,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return (
      <>
        <div>
          <h3 className="center">{message}</h3>
        </div>
        <p>You will be redirected to Homepage after few seconds.</p>
        <div>
          {flash ? (
            <Fade in={flash} timeout={{ enter: 500, exit: 3000 }}>
              <Alert style={styles.alert} severity="success">
                Order successfully placed! Please check your inbox.
              </Alert>
            </Fade>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Order a pizza" />

      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          {/* eslint will complain if you don't have input with an ID nested in label tag */}
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={updateValue}
              id="name"
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
          <input
            type="piegeacon"
            name="piegeacon"
            id="piegeacon"
            value={values.piegeacon}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.map((pizza) => (
            <MenuItemStyles key={pizza.id}>
              <Img
                fluid={pizza.image.asset.fluid}
                alt={pizza.name}
                width="50"
                height="50"
              />
              <div>
                <h2>{pizza.name}</h2>
              </div>
              <div className="order-sizeButtons-wrapper">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        id: pizza.id,
                        size,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(pizza.price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            removeFromOrder={removeFromOrder}
            pizzas={pizzas}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing order...' : 'Order Now'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    # The pizzas: is for renaming the fields
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

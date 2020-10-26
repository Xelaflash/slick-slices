import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';

export default function PizzasPage({ data }) {
  // destructuring the props you can go deep like function PizzasPage({ data: { pizzas } }) and call only pizza
  // console.log(data.pizzas);
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <h1>Pizzas Page</h1>
      <p>Currently we have {pizzas.length} pizzas available</p>
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// the query is exported but not put anywhere inside the component(pizzasPage) Gatsby will recognize the query component under the hood and will run it. Data is available under props.data.
export const query = graphql`
  query MyQuery {
    # The pizzas: is for renaming the fields
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

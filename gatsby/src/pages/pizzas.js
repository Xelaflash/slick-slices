import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilters from '../components/ToppingsFilter';

export default function PizzasPage({ data, pageContext }) {
  // destructuring the props you can go deep like function PizzasPage({ data: { pizzas } }) and call only pizza
  // console.log(data.pizzas);
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Pizzas with ${pageContext.topping}`
            : 'All pizzas'
        }
      />
      <p>Currently we have {pizzas.length} pizzas available</p>
      <ToppingsFilters activeTopping={pageContext.topping} />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

// the query is exported but not put anywhere inside the component(pizzasPage) Gatsby will recognize the query component under the hood and will run it. Data is available under props.data.
export const query = graphql`
  query PizzaQuery($topping: [String]) {
    # The pizzas: is for renaming the fields
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
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
            # fixed for fixed size img
            fixed(width: 200, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

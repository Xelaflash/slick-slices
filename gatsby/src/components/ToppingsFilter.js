import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    align-items: center;
    border-radius: 3px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return the pizzas with count
  const count = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if it's an existing toppping
      const existingTopping = acc[topping.id];
      // if yes increment by one
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        // otherwise create an new entry in our acc and set it to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
      // after comma is an empty object were we store our new object with the count
    }, {});
  // sort them based on the count
  const sortedToppings = Object.values(count).sort((a, b) => b.count - a.count);
  return sortedToppings;
}

export default function ToppingsFilters() {
  // Get the list of all toppings ==> need a static query (query without variables)
  // we destructured the toppings from the data payload
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `);
  // wrapping a console log in curly brackets permits to have the variables names.
  // console.clear();
  // console.log({ toppings, pizzas });

  // count how many pizzas are in each toppings
  const toppingsWithCount = countPizzasInToppings(pizzas.nodes);
  // console.log(toppingsWithCount);
  // link it up
  return (
    // loop over the list of toppings and display the topping ans the count of pizzas in that topping
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCount.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}

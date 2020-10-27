import { Link } from 'gatsby';
import React from 'react';
// gatsby image package to deliver all versions of the image (webp/jpeg, sizes..)
import Img from 'gatsby-image';
import styled from 'styled-components';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  /* grid generate auto rows for title toppings pic but it's not aligned we need to align the rows of the single pizza  on the grandparent ( pizzas list) */
  grid-auto-rows: auto auto 500px;
`;

const PizzasStyles = styled.div`
  display: grid;
  /* Take your row sizing not from the PizzasStyles div but from PizzaGridStyles grid*/
  /* below properties says if browser does not support whats inside parentesis then run the other propertie. */
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }
  /*  ⚠️ Chrome does not support subgrid */
  grid-template-rows: subgrid;
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

// this component is not exported because not used anywhere else in the app
function SinglePizza({ pizza }) {
  return (
    <PizzasStyles>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
      {/* for fixed img */}
      {/* <Img fixed={pizza.image.asset.fixed} alt={pizza.name} /> */}
    </PizzasStyles>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}

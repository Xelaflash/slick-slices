import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const PizzaPageStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  .centered {
    margin: 0 auto;
  }
`;

export default function SinglePizzaPage({ data: { pizza } }) {
  // const { pizza } = data; ==> No need for this because we are destructuring 2 level deep
  // console.log(pizza);
  return (
    <>
      {/* ? checks if its exists in case image src is not available */}
      <SEO title={pizza.name} image={pizza.image?.asset?.fluid?.src} />
      <PizzaPageStyle>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        <div className="centered">
          <h2 className="mark">{pizza.name}</h2>
          <ul>
            {pizza.toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaPageStyle>
    </>
  );
}

// this query needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  # slug variable is coming from gatsby-node context
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        id
        name
        vegetarian
      }
    }
  }
`;

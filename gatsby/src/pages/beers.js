import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const BeerGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    color: #484848;
    font-size: 10px;
    padding: 1rem 0;
  }
`;

const SingleBeerStyle = styled.div`
  border: 1px solid var(--grey);
`;

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;
  return (
    <>
      <h1 className="center">Our Beers</h1>
      <h2 className="center">
        We have {beers.length} beers available (only for dine in!)
      </h2>
      <BeerGridStyle>
        {beers.map((beer) => {
          const rating = Math.round(beer.rating.average);
          return (
            <SingleBeerStyle key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
              {/* for accessibility purpose e need a title  */}
              <p title={`${rating} out of 5 stars`}>
                {`⭐`.repeat(rating)}
                <span style={{ filter: `grayscale(100%)` }}>
                  {`⭐`.repeat(5 - rating)}
                </span>
                <span> ({beer.rating.reviews})</span>
              </p>
            </SingleBeerStyle>
          );
        })}
      </BeerGridStyle>
    </>
  );
}

// query the beers
export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;

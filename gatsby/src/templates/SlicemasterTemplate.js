import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';

export default function SingleSlicemasterPage({ data: { slicemaster } }) {
  return (
    <div>
      <div key={slicemaster.id} className="center">
        <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
        <h2>
          <span className="mark">{slicemaster.name}</span>
        </h2>
        <p className="description">{slicemaster.description}</p>
      </div>
    </div>
  );
}

export const query = graphql`
  # slug variable is coming from gatsby-node context
  query($slug: String!) {
    slicemaster: sanityPerson(slug: { current: { eq: $slug } }) {
      id
      name
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

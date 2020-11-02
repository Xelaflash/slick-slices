import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';

const PersonGridStyle = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const PersonStyle = styled.div`
  a {
    text-decoration: none;
    margin: 1rem auto;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    position: relative;
    margin-bottom: -2rem;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: -6rem 2rem 2rem 2rem;
    z-index: 2;
    /* z index is ignore without a position set */
    position: relative;
    transform: rotate(1deg);
  }
`;

export default function SlicemastersPage({ data }) {
  const slicemasters = data.slicemasters.nodes;
  return (
    <>
      <PersonGridStyle>
        {slicemasters.map((slicemaster) => (
          <PersonStyle key={slicemaster.id}>
            <Link to={`/slicemaster/${slicemaster.slug.current}`}>
              <h2>
                <span className="mark">{slicemaster.name}</span>
              </h2>
            </Link>
            <Img fluid={slicemaster.image.asset.fluid} alt={slicemaster.name} />
            <p className="description">{slicemaster.description}</p>
          </PersonStyle>
        ))}
      </PersonGridStyle>
    </>
  );
}

export const query = graphql`
  query {
    slicemasters: allSanityPerson {
      totalCount
      nodes {
        id
        name
        slug {
          current
        }
        description
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

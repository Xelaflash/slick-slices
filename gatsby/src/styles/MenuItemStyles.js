import styled from 'styled-components';

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 1.3rem;
  align-items: center;
  position: relative;
  .gatsby-image-wrapper {
    grid-row: span 2;
    height: 100%;
  }
  p {
    margin: 0;
  }
  button {
    font-size: 1.5rem;
    margin: 0.5rem 0.5rem 0;
    min-width: 120px;
  }
  h2 {
    max-width: 250px;
  }
  @media (max-width: 650px) {
    h2 {
      font-size: 2rem;
      /* max-width: 160px; */
    }
  }
  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
  @media only screen and (min-device-width: 320px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 2) {
    grid-template-columns: 1fr;
    h2 {
      text-align: center;
      padding: 2rem 0 1rem;
    }
    .order-sizeButtons-wrapper {
      padding-bottom: 2rem;
      text-align: center;
    }
  }
`;

export default MenuItemStyles;

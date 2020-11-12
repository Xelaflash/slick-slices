import styled from 'styled-components';

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  --columns: 2;
  grid-template-columns: repeat(var(--columns), minmax(auto, 1fr));
  @media (max-width: 800px) {
    --columns: 1;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

// Single grid item
export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img {
    /* border: 1px solid red; */
    height: auto;
    font-size: 0;
    border-radius: 3px;
    &.loading {
      --shine: white;
      --background: var(--grey);
      background-image: linear-gradient(
        90deg,
        var(--background) 0px,
        var(--shine) 40px,
        var(--background) 80px
      );
      background-size: 500px;
      animation: shine 1s infinite linear;
    }
  }
  p {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    width: 100%;
    transform: rotate(-2deg) translateY(-15px);
  }
`;

import React from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import Logo from './Logo';

const NavStyles = styled.nav`
  .logo {
    transform: translateY(-25%);
  }
  /* background: var(--yellow); */
  /* margin-bottom: 3rem; */
  padding: 5px 0;
  ul {
    margin: 0;
    padding: 0;
    display: grid;
    /* logo will be in the middle of the links and will take the remaining space with auto */
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    /* 2rem == 20px 'cause e set the base font size to 10px in global styles */
    grid-gap: 2rem;
    align-items: center;
    text-align: center;
    list-style: none;
    margin-top: -6rem;
  }
  li {
    --rotate: -2deg;
    transform: rotate(var(--rotate));
    order: 1;
    &:nth-child(1) {
      --rotate: 1deg;
    }
    &:nth-child(2) {
      --rotate: -2.5deg;
    }
    &:nth-child(4) {
      --rotate: 2.5deg;
    }
    &:hover {
      --rotate: 3deg;
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
    @media (max-width: 800px) {
      font-size: 2.5rem;
    }
  }
  @media (max-width: 700px) {
    --columns: 4;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--grey);
    padding-bottom: 2rem;
    ul {
      grid-template-rows: auto auto;
      grid-template-columns: repeat(var(--columns), 1fr);
      justify-items: center;
    }
    .logo-item {
      order: 0;
      grid-column: 1 / -1;
    }
    .logo {
      transform: none;
    }
  }
  @media (max-width: 500px) {
    --columns: 2;
  }
`;

// ! See comment below
// function goToSlicePage() {
//   setTimeout(() => {
//     console.log('go to slices');
//     navigate('/slicemasters', { replace: true });
//     // option replace : true adds the page to the browser history (==> go back button)
//   }, 2000);
// }

export default function Nav() {
  return (
    <NavStyles>
      <ul>
        {/* <li>
          <Link to="/">Home</Link>
        </li> */}
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li className="logo-item">
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <Link to="/order">Order Now</Link>
        </li>
        {/* Not useful for course but for knowledge only. The button is reloading full page can be useful for forms */}
        {/* <button type="button" onClick={goToSlicePage}>
          click me and go to slicemaster page after 2sec
        </button> */}
      </ul>
    </NavStyles>
  );
}

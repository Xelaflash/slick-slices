import React from 'react';
import { Link, navigate } from 'gatsby';

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
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Now</Link>
        </li>
        {/* Not useful for course but for knowledge only. The button is reloading full page can be useful for forms */}
        {/* <button type="button" onClick={goToSlicePage}>
          click me and go to slicemaster page after 2sec
        </button> */}
      </ul>
    </nav>
  );
}

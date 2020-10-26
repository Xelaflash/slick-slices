import { Link } from 'gatsby';
import React from 'react';
// gatsby image package to deliver all versions of the image (webp/jpeg, sizes..)
import Img from 'gatsby-image';

// this component is not exported because not used anywhere else in the app
function SinglePizza({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(', ')}</p>
        <Img fluid={pizza.image.asset.fluid} alt={pizza.name} />
        {/* for fixed img */}
        {/* <Img fixed={pizza.image.asset.fixed} alt={pizza.name} /> */}
      </Link>
    </div>
  );
}

export default function PizzaList({ pizzas }) {
  return (
    <div>
      {pizzas.map((pizza) => (
        <SinglePizza key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

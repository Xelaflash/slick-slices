import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/PizzaTemplate.js');
  // 2. query all pizzas (via node API)
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // console.log(data);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    // console.log('creating a page for', pizza.name);
    actions.createPage({
      // specify the URL for the page
      path: `/pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      // in order to pass data from this createPage method to the actual template you need context
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. we dont create a new template as we need to filter in pizzas.js
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. query all toppings (via node API)
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `);
  // console.log(data);
  // 3. loop over each topping and create a page for that topping
  data.toppings.nodes.forEach((topping) => {
    // console.log('creating a page for', topping.name);
    actions.createPage({
      // specify the URL for the page
      path: `/topping/${topping.name}`,
      component: toppingTemplate,
      // in order to pass data from this createPage method to the actual template you need context
      context: {
        topping: topping.name,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1. fetch a list of beersPage
  // ==> Fetch is a Browser API, not a node api therefore need to use isomorphic fetch
  const response = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await response.json();
  // 2. loop over each one
  beers.forEach((beer) => {
    // 3. create a node for that beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      child: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({ ...beer, ...nodeMeta });
  });
}

async function turnSlicemastersIntoPages({ graphql, actions }) {
  // query all slicemasters
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          id
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // turn each one into a page
  data.slicemasters.nodes.forEach((slicemaster) => {
    // console.log('creating a page for', pizza.name);
    actions.createPage({
      // specify the URL for the page
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/SlicemasterTemplate.js'),
      // in order to pass data from this createPage method to the actual template you need context
      context: {
        slug: slicemaster.slug.current,
      },
    });
  });
  // figure out how many pages there are based on how many slicemasters there are and how many per page!
  // On .env a number is like a string so need to parse it as in Integer here.
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  //  Loop from 1 to n and create the pages for them
  Array.from({ length: pageCount }).forEach((_, index) => {
    // console.log(`creating page n: ${index + 1}`);
    actions.createPage({
      // specify the URL for the page
      path: `/slicemasters/${index + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      // in order to pass data from this createPage method to the actual page you need context
      context: {
        skip: index * pageSize,
        currentPage: index + 1,
      },
    });
  });
}

// Source Beer data from an API into our Gatsby API
export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // Create pages dynamically
  // wait for all promises to be resolved before finishing them all
  await Promise.all([
    // pizzas
    turnPizzasIntoPages(params),
    // toppings
    turnToppingsIntoPages(params),
    // sclimemasters
    turnSlicemastersIntoPages(params),
  ]);
}

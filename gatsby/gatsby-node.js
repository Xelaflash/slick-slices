import path from 'path';

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
  console.log(data);
  // 3. loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    console.log('creating a page for', pizza.name);
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

export async function createPages(params) {
  // Create pages dynamically
  // pizzas
  await turnPizzasIntoPages(params);
  // toppings
  // sclimemasters
}

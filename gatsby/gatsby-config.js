// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv from 'dotenv';

// specify where to find the .env file
dotenv.config({ path: '.env' });
// ! To check if .env works but dangerous!! TO ERASE for real apps
// console.log(process.env.SANITY_TOKEN);

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://gatsby.pizza`,
    description: `The best pizzas in town`,
    twitter: '@slicksSlices',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      // name of the plugin
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'kbxgs6d9',
        dataset: 'production',
        // below permits to update gatsby on dev mode without doing a rebuild
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};

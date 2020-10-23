import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';

export default {
  // Computer name
  name: 'pizza',
  // visible name
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'Name of the pizza',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: '100',
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        // permet de selectionnner une zone de la photo pour le cropping
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza in cents',
      // validation of data like in rails.
      // Here min price is 10Dolls
      validation: (Rule) => Rule.min(1000),
      // TODO: Add custom component
      inputComponent: PriceInput,
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  // Customize the preview field in sanity studio
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    // destructuring put properties in their own variables, spread the topping to another object
    prepare: ({ title, media, ...toppings }) => {
      // 1. filter out the undefined toppings (undefined consider as false)
      // toppings is an object we want the values ==> need to wrap it Object.value
      const tops = Object.values(toppings).filter(Boolean);

      // 2 . return the preview object for the pizza
      return {
        title,
        media,

        subtitle: tops.join(', '),
      };
    },
  },
};

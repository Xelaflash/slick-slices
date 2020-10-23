import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  // Computer name
  name: 'topping',
  // visible name
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Topping is vegetarian?',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  // Customize the preview field in sanity studio
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    // destructuring put properties in their own variables
    prepare: ({ name, vegetarian }) => ({
      // what will be displayed as a preview ==> you can put custom js soooo coool
      title: `${name} ${vegetarian ? '🍃' : ''}`,
    }),
  },
};

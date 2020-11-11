import { MdStore as icon } from 'react-icons/md';

export default {
  // Computer name
  name: 'storeSettings',
  // visible name
  title: 'Store settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Store name',
      type: 'string',
      description: 'Name of the store',
    },
    {
      name: 'slicemaster',
      title: 'Slicemasters currently slicing',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'person' }] }],
    },
    {
      name: 'hotSlices',
      title: "Today's Hot Pizzas",
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
  // Customize the preview field in sanity studio
};

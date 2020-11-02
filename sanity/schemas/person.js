import { IoIosPeople as icon } from 'react-icons/io';

// ! In case of change of schema, command needs to be run : sanity graphql deploy

export default {
  // Computer name
  name: 'person',
  // visible name
  title: 'Slicemasters',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us a little bit about yourself',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        // permet de sélectionner une zone de la photo pour le cropping
        hotspot: true,
      },
    },
  ],
  // Customize the preview field in sanity studio
  // ! NO NEED for preview here because sanity do it automatically based on name and image
  // preview: {
  //   select: {
  //     name: 'name',
  //     media: 'image',
  //   },
  //   prepare: ({ name, media }) => ({
  //     title: `${name}`,
  //     media,
  //   }),
  // },
};

import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { MdHome as icon } from 'react-icons/md';
//  Build a custom sidebar
export default function sidebar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      // create a sub item
      S.listItem().title('Home page').icon(icon).child(
        S.editor()
          .schemaType('storeSettings')
          // Make a new doc id so we don't have a random string of characters
          .documentId('downtownStore')
      ),
      // add in the rest of our document items
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}

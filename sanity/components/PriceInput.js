// ! This is not really needed. We are creatinga custom input to be displayed in standard price for the guy who will enter the data.
// ! Goal is to see how to build a custom component to replace the sanity defaults.

import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <h2>
        {type.title} -{' '}
        {value ? formatMoney(value / 100) : 'price not given yet'}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};

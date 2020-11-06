import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  function updateValue(e) {
    // check if it's a number (not needed here but good for re usabilty)
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // copy the existing values
      ...values,
      // update with the new value
      [e.target.name]: value,
    });
  }
  return { values, updateValue };
}

import { useState } from 'react';

const useForm = (callback) => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);

  const initValues = (values) => {
    setValues(values);
  };

  const handleChange = (event) => {
    // Extract event target
    const {
      value, name, checked, type, files,
    } = event.target;

    const auxValues = { ...values };

    if (type) {
      switch (type) {
        // checkbox
        case 'checkbox':
          if (checked) {
            if (!auxValues[name]) {
              auxValues[name] = [];
            }
            auxValues[name].push(+value);
          } else {
            const index = auxValues[name].filter(item => item !== +value);
            auxValues[name] = index;
          }
          break;
        // input
        default:
          if (files) {
            auxValues[name] = files[0].name;
          } else {
            auxValues[name] = value;
          }
          break;
      }
    }
    setValues(auxValues);
  };

  const handleSubmit = callback => (event) => {
    event.preventDefault();
    setLoading(true);
    callback();
    setLoading(false);
  };

  return [{ values, loading }, initValues, handleChange, handleSubmit];
};

export default useForm;

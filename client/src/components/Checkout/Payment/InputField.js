import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  const isError = false;

  return (
    <Controller
      name={name}
      control={control}
      render = {({field}) => (
          <TextField
            {...field}
            fullWidth
            label={label}
            required={required}
          />
      )}
    />
  );
}

export default FormInput;
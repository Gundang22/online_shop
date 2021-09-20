import React, {useState} from 'react';
import { Button, Grid, Typography, TextField, FormControlLabel, Checkbox, FormControl } from '@material-ui/core';

const Address = ({activeStep, setActiveStep, addressData, setAddressData}) => {
  const [validated, setValidated] = useState(false);

  const handleNext = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    setActiveStep(activeStep + 1);
  };
  const handleChange = (e) => {
    setAddressData({...addressData, [e.target.name]: e.target.value});
  };

  return (
    <React.Fragment>
      <Typography variant="h6">
        Shipping Information
      </Typography>
      <form onSubmit={handleNext} validated={validated} style={{width:'100%'}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              required
              defaultValue={addressData.fname}
              id="fname"
              name="fname"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              required
              id="lname"
              defaultValue={addressData.lname}
              name="lname"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              required
              defaultValue={addressData.address1}
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              defaultValue={addressData.address2}
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              required
              defaultValue={addressData.city}
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              required
              defaultValue={addressData.state}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              required
              defaultValue={addressData.zip}
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handleChange}
              required
              defaultValue={addressData.country}
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} style={{display:'flex', justifyContent:'end'}}>
            <Button type='submit' variant='outlined' color='primary' size='large'>Next</Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default Address
import React, {useState, useEffect} from 'react';
import { Button, Grid, Typography, TextField, InputLabel, Select, MenuItem } from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';
import { commerce } from '../../../lib/commerce';
import FormInput from './InputField';

const Address = ({checkoutToken, handleAddress}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingStates, setShippingStates] = useState([]);
  const [shippingState, setShippingState] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const [disabled, setDisabled] = useState(true);
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}));
  const states = Object.entries(shippingStates).map(([code, name]) => ({id: code, label: name}));
  const options = shippingOptions.map((option) => ({id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})`}));

  useEffect(() => {
    fetchCountries();
  }, []);
  useEffect(() => {
    if(shippingCountry)
      fetchStates(shippingCountry);
  }, [shippingCountry]);
  useEffect(() => {
    if(shippingState)
      fetchShippingOptions();
  }, [shippingState]);

  const fetchCountries = async() => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutToken.id);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };
  const fetchStates = async(country) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(country)
    setShippingStates(subdivisions);
    setShippingState(Object.keys(subdivisions)[0]);
  }
  const fetchShippingOptions = async() => {
    const options = await commerce.checkout.getShippingOptions(checkoutToken.id, {country: shippingCountry, region: shippingState});
    setShippingOptions(options);
    setShippingOption(options[0].id);
  }

  useEffect(() => {
    if(shippingOption === '' || shippingCountry === '' || shippingState === '')
      setDisabled(true);
    else
      setDisabled(false);
  }, [shippingOption, shippingState, shippingCountry])
  
  return (
    <>
    <Typography variant="h6" gutterBottom>Shipping Information</Typography>
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => handleAddress({ ...data, shippingCountry, shippingState, shippingOption }))}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormInput required name="firstname" label="First name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput required name="lastname" label="Last name" />
          </Grid>
          <Grid item xs={12}>
            <FormInput required name="address1" label="Address Line 1" />
          </Grid>
          <Grid item xs={12}>
            <FormInput name="address2" label="Address Line 2" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput required name="city" label="City" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput required name="zip" label="Postal/Zip" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput required name="email" label="Email" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormInput required name="phone" label="Phone Number" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
              {
                countries.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping State</InputLabel>
            <Select value={shippingState} fullWidth onChange={(e) => setShippingState(e.target.value)}>
              {
                states.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Option</InputLabel>
            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
              {
                options.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.label}
                  </MenuItem>
                ))
              }
            </Select>
          </Grid>
          <Grid item xs={12} sm={6} style={{display:'flex', justifyContent:'end'}}>
            <Button type='submit' variant='contained' color='primary' disabled={disabled}>
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  </>
  );
}

export default Address
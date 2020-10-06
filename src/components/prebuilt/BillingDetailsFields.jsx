import FormField from "./FormField";
import React from 'react';

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="First and Last"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="example@example.com"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="Address (plus apt/ste/unit)"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="Jacksonville"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="Florida"
        required
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="32256"
        required
      />
    </>
  );
};

export default BillingDetailsFields;

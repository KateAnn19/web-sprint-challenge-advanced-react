// Write up the two tests here and make sure they are testing what the title shows
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import CheckoutForm from './CheckoutForm';



test("form header renders", () => {
    const {getByText} = render(<CheckoutForm/>);
    const displayHeader = getByText(/checkout form/i);
    expect(displayHeader).toBeVisible();
});

test("form shows success message on submit with form details", () => {
    const{getByLabelText, getByText, getByTestId, getByRole} = render(<CheckoutForm/>);

  //querying for all the input nodes
  const fNameInput = getByLabelText(/f\s*i\s*r\s*s\s*t\s*N\s*a\s*m\s*e\s*/i);
  const lNameInput = getByLabelText(/l\s*a\s*s\s*t\s*N\s*a\s*m\s*e/i);
  const addressInput = getByLabelText(/address/i);
  const cityInput = getByLabelText(/city/i);
  const stateInput = getByLabelText(/state/i);
  const zipInput = getByLabelText(/zip/i);
  
  //ACT
  //use the change event to add text to each input
  //clicks, onClick, onSubmit, onChange

  fireEvent.change(fNameInput, {target: {value: "manoj"}});
  fireEvent.change(lNameInput, {target: {value: "shankar"}});
  fireEvent.change(addressInput, {target: {value: "479 ventus"}});
  fireEvent.change(cityInput, {target: {value: "lafayette"}});
  fireEvent.change(stateInput, {target: {value: "ca"}});
  fireEvent.change(zipInput, {target: {value: "74012"}});

  //ASSERT
  expect(fNameInput.value).toBe('manoj');
  expect(lNameInput.value).toBe('shankar');
  expect(addressInput.value).toBe('479 ventus');
  expect(cityInput.value).toBe('lafayette');
  expect(stateInput.value).toBe('ca');
  expect(zipInput.value).toBe('74012');

  //query for the button
  const submitButton = getByRole('button', {name:/checkout/i});
  //click on the button!
  fireEvent.click(submitButton);

  //assert that the message is added with the form details
  const successMessage = getByTestId("successMessage");
  expect(successMessage).toBeInTheDocument();

  const fNameText = getByText(/manoj/i);
  expect(fNameText).toBeInTheDocument();

  const lNameText = getByText(/shankar/i);
  expect(lNameText).toBeInTheDocument();

  const addressText = getByText(/479 ventus/i);
  expect(addressText).toBeInTheDocument();

  const cityText = getByText(/lafayette/i);
  expect(cityText).toBeInTheDocument();

  const stateText = getByText(/ca/i);
  expect(stateText).toBeInTheDocument();

  const zipText = getByText(/74012/i);
  expect(zipText).toBeInTheDocument();
});
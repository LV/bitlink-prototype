import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Checkbox, FormControl, FormGroup, FormControlLabel } from "@mui/material";

const theme = createTheme({
	palette: {
	  primary: {
		main: "#EEEEEE",
	  },
	},
});

export default function SelectOrderColumns() {
  const dateChecked = true;

  const checkBoxes = ["date", "orderNumber", "customerId", "price", "items"]

  function handleOrderColumns() {
    console.log("SEWI");
    console.log(dateChecked);
  }

  return(
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          // value={checkBoxes[0]}
          control={<Checkbox defaultChecked />}
          label="Date"
          labelPlacement="top"
          // checked={dateChecked}
        />
        <FormControlLabel
          value="number"
          control={<Checkbox defaultChecked />}
          label="Order Number"
          labelPlacement="top"
        />
        <FormControlLabel
          value="customerid"
          control={<Checkbox defaultChecked />}
          label="Customer ID"
          labelPlacement="top"
        />
        <FormControlLabel
          value="price"
          control={<Checkbox defaultChecked />}
          label="Price"
          labelPlacement="top"
        />
        <FormControlLabel
          value="items"
          control={<Checkbox defaultChecked />}
          label="Items"
          labelPlacement="top"
        />
      </FormGroup>
      <ThemeProvider theme={theme}>
        <Button color="primary" variant="contained" onClick={handleOrderColumns}>
          Filter
        </Button>
      </ThemeProvider>
    </FormControl>
  );
}

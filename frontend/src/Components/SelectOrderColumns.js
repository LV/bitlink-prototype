import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Checkbox, FormControl, FormGroup, FormControlLabel } from "@mui/material";
import axios from "axios";

const theme = createTheme({
	palette: {
	  primary: {
		main: "#EEEEEE",
	  },
	},
});

export default function SelectOrderColumns() {
  const [orderIdChecked, setOrderIdCheckbox] = useState(true);
  const [customerIdChecked, setCustomerIdCheckbox] = useState(true);
  const [companyAccountChecked, setCompanyAccountCheckbox] = useState(true);
  const [merchantIdChecked, setMerchantIdCheckbox] = useState(true);
  const [walletIdChecked, setWalletIdCheckbox] = useState(true);
  const [dateTimeChecked, setDateTimeCheckbox] = useState(true);
  const [feeChecked, setFeeCheckbox] = useState(true);
  const [orderGetBody, setOrderGetBody] = useState({
    order_id: orderIdChecked,
    customer_id: customerIdChecked,
    company_account_number: companyAccountChecked,
    merchant_id: merchantIdChecked,
    wallet_id: walletIdChecked,
    datetime: dateTimeChecked,
    fee_percentage: feeChecked,
  })

  const handleOrderIdChange = (event) => {
    setOrderIdCheckbox(event.target.checked);
  };

  const handleCustomerIdChange = (event) => {
    setCustomerIdCheckbox(event.target.checked);
  };

  const handleCompanyAccountChange = (event) => {
    setCompanyAccountCheckbox(event.target.checked);
  };

  const handleMerchantIdChange = (event) => {
    setMerchantIdCheckbox(event.target.checked);
  };

  const handleWalletIdChange = (event) => {
    setWalletIdCheckbox(event.target.checked);
  };

  const handleDateTimeChange = (event) => {
    setDateTimeCheckbox(event.target.checked);
  };

  const handleFeeChange = (event) => {
    setFeeCheckbox(event.target.checked);
  };
  
  function handleOrderProjection() {
    console.log([orderIdChecked, customerIdChecked, companyAccountChecked, merchantIdChecked, walletIdChecked, dateTimeChecked, feeChecked]);
    axios.put(`http://localhost:8080/projOrder`,
      orderGetBody
    ).then((response) => {
      const { data } = response;
      console.log(data);
    });
  };

  return(
    <FormControl component="fieldset">
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="orderId"
          control={<Checkbox checked={orderIdChecked} onChange={handleOrderIdChange} />}
          label="Order Number"
          labelPlacement="top"
        />
        <FormControlLabel
          value="customerid"
          control={<Checkbox checked={customerIdChecked} onChange={handleCustomerIdChange} />}
          label="Customer ID"
          labelPlacement="top"
        />
        <FormControlLabel
          value="companyNum"
          control={<Checkbox checked={companyAccountChecked} onChange={handleCompanyAccountChange} />}
          label="Company Account Number"
          labelPlacement="top"
        />
        <FormControlLabel
          value="merchantId"
          control={<Checkbox checked={merchantIdChecked} onChange={handleMerchantIdChange} />}
          label="Merchant ID"
          labelPlacement="top"
        />
        <FormControlLabel
          value="walletId"
          control={<Checkbox checked={walletIdChecked} onChange={handleWalletIdChange} />}
          label="Wallet ID"
          labelPlacement="top"
        />
        <FormControlLabel
          value="date"
          control={<Checkbox checked={dateTimeChecked} onChange={handleDateTimeChange} />}
          label="Date Time"
          labelPlacement="top"
        />
        <FormControlLabel
          value="fee"
          control={<Checkbox checked={feeChecked} onChange={handleFeeChange} />}
          label="Fee Percentage"
          labelPlacement="top"
        />
      </FormGroup>
      <ThemeProvider theme={theme}>
        <Button color="primary" variant="contained" onClick={handleOrderProjection}>
          Filter
        </Button>
      </ThemeProvider>
    </FormControl>
  );
}

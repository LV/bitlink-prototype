import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./Navbar";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Checkbox, FormControl, FormGroup, FormControlLabel } from "@mui/material";
import axios from "axios";

const theme = createTheme({
	palette: {
    primary: {
      main: "#EEEEEE",
    },
	},
});


export default function MerchantDashboard() {
  const [orderIdChecked, setOrderIdCheckbox] = useState(true);
  const [customerIdChecked, setCustomerIdCheckbox] = useState(true);
  const [companyAccountChecked, setCompanyAccountCheckbox] = useState(true);
  const [merchantIdChecked, setMerchantIdCheckbox] = useState(true);
  const [walletIdChecked, setWalletIdCheckbox] = useState(true);
  const [dateTimeChecked, setDateTimeCheckbox] = useState(true);
  const [feeChecked, setFeeCheckbox] = useState(true);

  const [columnDefs, setColumnDefs] = useState(null);

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

  const [resData, setResData] = useState(null);

  function colDefine() {
    var filterCol = [];
    if(orderIdChecked) filterCol.push({field: 'order_id'});
    if(customerIdChecked) filterCol.push({field: 'customer_id'});
    if(companyAccountChecked) filterCol.push({field: 'company_account_number'});
    if(merchantIdChecked) filterCol.push({field: 'merchant_id'});
    if(walletIdChecked) filterCol.push({field: 'wallet_id'});
    if(dateTimeChecked) filterCol.push({field: 'datetime'});
    if(feeChecked) filterCol.push({field: 'fee_percentage'});

    return filterCol;
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/orderProj`, {
      params: {
        order_id: orderIdChecked,
        customer_id: customerIdChecked,
        company_account_number: companyAccountChecked,
        merchant_id: merchantIdChecked,
        wallet_id: walletIdChecked,
        datetime: dateTimeChecked,
        fee_percentage: feeChecked,
      }
    }).then((response) => {
      const { data } = response;
      setResData(data);

      const tableCols = []
      tableCols.push(orderIdChecked);
      tableCols.push(customerIdChecked);
      tableCols.push(companyAccountChecked);
      tableCols.push(merchantIdChecked);
      tableCols.push(walletIdChecked);
      tableCols.push(dateTimeChecked);
      tableCols.push(feeChecked);
      var colDef = colDefine(tableCols);
      setColumnDefs(colDef);

      console.log(data);
      console.log(tableCols);
    });
  }, [orderIdChecked, customerIdChecked, companyAccountChecked, merchantIdChecked, walletIdChecked, dateTimeChecked, feeChecked, colDefine]);

    return (
      <>
        <Navbar cusPage={false} merPage={true} coPage={false} chkPage={false} />
        <FormControl style={{
          paddingTop: 40,
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex_start",
        }}
        >
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
          </FormControl>
        </FormControl>
        <FormControl style={{
          paddingTop: 40,
          height: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex_start",
        }}
        >
          <h3 style={{marginLeft: 22}}>Orders</h3>
          <div className='ag-theme-alpine' style={{ width: 1005, height: 500, marginLeft: 20 }}>
            <AgGridReact
              rowData={resData}
              columnDefs={columnDefs}
              // onRowClicked we should retrieve the relevant order from the backend and display the OrderDetails on a new page and provide an option to cancel it?
              // or just add a column with cancel buttons
              onRowClicked={(e) => console.log("row clicked", e.data)}
            />
          </div>
        </FormControl>
      </>
  );
}

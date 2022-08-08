import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Checkbox, FormControl, FormGroup, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

export default function MerchantDashboard() {
  const [orderIdChecked, setOrderIdCheckbox] = useState(true);
  const [customerIdChecked, setCustomerIdCheckbox] = useState(true);
  const [companyAccountChecked, setCompanyAccountCheckbox] = useState(true);
  const [merchantIdChecked, setMerchantIdCheckbox] = useState(true);
  const [walletIdChecked, setWalletIdCheckbox] = useState(true);
  const [dateTimeChecked, setDateTimeCheckbox] = useState(true);
  const [feeChecked, setFeeCheckbox] = useState(true);
  const [orderCancelled, setOrderCancelled] = React.useState('');

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
      console.log(resData)
      const filterCol = [];
      if (orderIdChecked) filterCol.push({ field: 'order_id' });
      if (customerIdChecked) filterCol.push({ field: 'customer_id' });
      if (companyAccountChecked) filterCol.push({ field: 'company_account_number' });
      if (merchantIdChecked) filterCol.push({ field: 'merchant_id' });
      if (walletIdChecked) filterCol.push({ field: 'wallet_id' });
      if (dateTimeChecked) filterCol.push({ field: 'datetime' });
      if (feeChecked) filterCol.push({ field: 'fee_percentage' });
      setColumnDefs(filterCol);
    });
  }, [orderIdChecked, customerIdChecked, companyAccountChecked, merchantIdChecked, walletIdChecked, dateTimeChecked, feeChecked, orderCancelled]);

  var menuItems = [<MenuItem key={"none"} value="">
    <em>None</em>
  </MenuItem>]

  if (resData != null) {
    menuItems = resData.map((order) => (<MenuItem key={order.order_id} value={order.order_id}>{order.order_id}</MenuItem>))
    menuItems.unshift(<MenuItem key={"none"} value="">
      <em>None</em>
    </MenuItem>)
  }

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
        <h4>Filter Columns:</h4>
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
        <h3 style={{ marginLeft: 22 }}>Orders</h3>
        <div className='ag-theme-alpine' style={{ width: 1402, height: 500, marginLeft: 20 }}>
          <AgGridReact
            rowData={resData}
            columnDefs={columnDefs}
            // onRowClicked we should retrieve the relevant order from the backend and display the OrderDetails on a new page and provide an option to cancel it?
            // or just add a column with cancel buttons
            onRowClicked={(e) => console.log("row clicked", e.data)}
          />

        </div>
      </FormControl>
      <FormControl style={{ marginLeft: 65, minWidth: 150, marginTop: 10 }} size="small">
        <InputLabel id="demo-select-small">Cancel Order</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={orderCancelled}
          label="Cancel Order"
          onChange={(e) => {
            console.log(e.target.value)
            setOrderCancelled(e.target.value)
            axios
              .delete(`http://localhost:8080/order/${e.target.value}`)
          }}
        >
          {
            menuItems
          }
        </Select>
      </FormControl>
    </>
  );
}

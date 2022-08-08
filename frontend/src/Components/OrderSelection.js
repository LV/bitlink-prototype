import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import Navbar from "./Navbar";
import { Box, Button, createTheme, FormControl, FormControlLabel, FormLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, ThemeProvider } from "@mui/material";
import axios from "axios";

export default function OrderSelection() {
  const [ rowData, setRowData ] = useState(null);
  const [ isSubscriptionPurchase, setIsSubscriptionPurchase ] = useState(false);
  const [ isGreaterThan, setIsGreaterThan ] = useState(true);
  const [ filterValue, setFilterValue ] = useState(0);
  const [ toggleButton, setToggleButton ] = useState(false);

  const [ columnDefs, setColumnDefs ] = useState([
    {field: 'order_id'},
    {field: 'conversion_rate'},
    {field: 'total_usd_price'},
  ]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#EEEEEE",
      },
    },
  });

  useEffect(() => {
    if(isNaN(filterValue) || filterValue === null || filterValue === "") setFilterValue(0);
    
    if(isGreaterThan) {
      axios.get(`http://localhost:8080/purchaseSelection`, {
        params: {
          subTable: isSubscriptionPurchase,
          order_id: true,
          conversion_rate: true,
          usd_price: true,
          priceGreaterThan: filterValue,
          billing_frequency: true,
          billing_duration: true,
        }
      }).then((response) => {
        const { data } = response;
        setRowData(data);
        if(isSubscriptionPurchase) {
          setColumnDefs([
            {field: 'order_id'},
            {field: 'conversion_rate'},
            {field: 'charge_usd_price'},
            {field: 'billing_frequency'},
            {field: 'billing_duration'},
          ]);
        } else {
          setColumnDefs([
            {field: 'order_id'},
            {field: 'conversion_rate'},
            {field: 'total_usd_price'},
          ]);
        } 
      });
    } else {
      axios.get(`http://localhost:8080/purchaseSelection`, {
        params: {
          subTable: isSubscriptionPurchase,
          order_id: true,
          conversion_rate: true,
          usd_price: true,
          priceLessThan: filterValue,
          billing_frequency: true,
          billing_duration: true,
        }
      }).then((response) => {
        const { data } = response;
        setRowData(data);
        if(isSubscriptionPurchase) {
          setColumnDefs([
            {field: 'order_id'},
            {field: 'conversion_rate'},
            {field: 'charge_usd_price'},
            {field: 'billing_frequency'},
            {field: 'billing_duration'},
          ]);
        } else {
          setColumnDefs([
            {field: 'order_id'},
            {field: 'conversion_rate'},
            {field: 'total_usd_price'},
          ]);
        } 
      });
    }
  }, [isSubscriptionPurchase, isGreaterThan, toggleButton]);

  const handleChangeTransactionType = (event) => {
    setIsSubscriptionPurchase(event.target.value);
  };

  const handleChangeRadio = (event) => {
    setIsGreaterThan(event.target.value);
  };

  return (
    <>
      <Navbar orSel={true} />
      <FormControl variant="standard" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex_start',
        height: 250,
        marginTop: 20,
      }}>
        <Box sx={{ width:220 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-select-small'>Transaction Type</InputLabel>
            <Select
              lableid='demo-select-small'
              id='demo-select-small'
              value={isSubscriptionPurchase}
              label='TransactionType'
              onChange={handleChangeTransactionType}
            >
              <MenuItem value={true}>Subscription Purchase</MenuItem>
              <MenuItem value={false}>One-time Purchase</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl style={{ height: 50 }} />
        <Input
          autoComplete='off'
          type='text'
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <ThemeProvider theme={theme}>
          <Button
            color='primary'
            variant='contained'
            size='small'
            onClick={() => { setToggleButton(!toggleButton)}}
            style={{ marginTop: 15, marginLeft: 10 }}>
              {" "}
              Filter Price
          </Button>
        </ThemeProvider>
        <FormControl style={{ height: 75 }} />
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Filter Type</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={isGreaterThan}
            onChange={handleChangeRadio}
          >
            <FormControlLabel value={true} control={<Radio />} label="Greater Than" />
            <FormControlLabel value={false} control={<Radio />} label="Less Than" />
          </RadioGroup>
        </FormControl>
      </FormControl>
      <center>
        <div className='ag-theme-alpine' style={{
          width: 1005,
          height: 500,
          marginLeft: 20,
        }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            />
        </div>
      </center>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Navbar from "./Navbar";
import {
  Button,
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  ThemeProvider,
  Switch,
  Checkbox,
} from "@mui/material";
import axios from "axios";

export default function OrderSelection() {
  const [order_id, setorder_id] = useState(true);
  const [conversion_rate, setconversion_rate] = useState(true);
  const [price, setPrice] = useState(true);
  const [billing_frequency, setbilling_frequency] = useState(true);
  const [billing_duration, setbilling_duration] = useState(true);

  const [rowData, setRowData] = useState(null);
  const [columnDefs, setColumnDefs] = useState([]);
  const [isSubscriptionPurchase, setIsSubscriptionPurchase] = useState(false);
  const [isGreaterThan, setIsGreaterThan] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [priceParams, setpriceParams] = useState({});

  const theme = createTheme({
    palette: {
      primary: {
        main: "#EEEEEE",
      },
    },
  });

  useEffect(() => {
    const baseParams = {
      subTable: isSubscriptionPurchase,
      order_id: order_id,
      conversion_rate: conversion_rate,
      usd_price: price,
    };

    const subscriptionParams = {
      billing_frequency: billing_frequency,
      billing_duration: billing_duration,
    };

    const params = isSubscriptionPurchase
      ? { ...baseParams, ...subscriptionParams, ...priceParams }
      : { ...baseParams, ...priceParams };

    axios
      .get("http://localhost:8080/purchaseSelection", {
        params,
      })
      .then((response) => {
        const { data } = response;
        setRowData(data);
      });
  }, [
    isSubscriptionPurchase,
    order_id,
    conversion_rate,
    price,
    billing_frequency,
    billing_duration,
    priceParams,
  ]);

  useEffect(() => {
    const filterCol = [];
    if (isSubscriptionPurchase) {
      if (order_id) filterCol.push({ field: "order_id" });
      if (conversion_rate) filterCol.push({ field: "conversion_rate" });
      if (price) filterCol.push({ field: "charge_usd_price" });
      if (billing_frequency) filterCol.push({ field: "billing_frequency" });
      if (billing_duration) filterCol.push({ field: "billing_duration" });
    } else {
      if (order_id) filterCol.push({ field: "order_id" });
      if (conversion_rate) filterCol.push({ field: "conversion_rate" });
      if (price)
        filterCol.push({
          field: "total_usd_price",
        });
    }
    setColumnDefs(filterCol);
  }, [
    isSubscriptionPurchase,
    order_id,
    conversion_rate,
    price,
    billing_frequency,
    billing_duration,
  ]);

  function handleChangeTransactionType(event) {
    setIsSubscriptionPurchase(event);
  }

  function handleOrderId(isChecked) {
    setorder_id(isChecked);
  }

  function handleConversionRate(isChecked) {
    setconversion_rate(isChecked);
  }

  function handlePrice(isChecked) {
    setPrice(isChecked);
  }

  function handleBillingFrequency(isChecked) {
    setbilling_frequency(isChecked);
  }

  function handleBillingDuration(isChecked) {
    setbilling_duration(isChecked);
  }

  function handleToggle(event) {
    if (Boolean(event)) {
      setToggleButton(true);
    } else {
      setToggleButton(false);
      setpriceParams({});
    }
  }

  function handleChangeRadio(isGreaterThan) {
    setIsGreaterThan(isGreaterThan);
  }

  function handleFilterPrice(event) {
    if (!toggleButton || !filterValue) {
      setpriceParams({});
    } else {
      isGreaterThan
        ? setpriceParams({ priceGreaterThan: filterValue })
        : setpriceParams({ priceLessThan: filterValue });
    }
  }

  function handleClear() {
    setFilterValue("");
    setpriceParams({});
  }

  return (
    <>
      <Navbar orSel={true} />
      <h3 style={{ marginLeft: 22, marginTop: 12 }}>Order Selection</h3>
      <FormControl
        variant="standard"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 14,
        }}
      >
        <FormControl>
          <InputLabel>Transaction Type</InputLabel>
          <Select
            value={isSubscriptionPurchase}
            label="TransactionType"
            onChange={(e) => handleChangeTransactionType(e.target.value)}
          >
            <MenuItem value={true}>Subscription Purchase</MenuItem>
            <MenuItem value={false}>One-time Purchase</MenuItem>
          </Select>
        </FormControl>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 16,
            justifyContent: "center",
            width: 1000,
          }}
        >
          <FormLabel
            style={{
              marginRight: 20,
            }}
          >
            Filter Columns:
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={order_id}
                onChange={(e) => handleOrderId(e.target.checked)}
              />
            }
            label="Order ID"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={conversion_rate}
                onChange={(e) => handleConversionRate(e.target.checked)}
              />
            }
            label="Conversion Rate"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={price}
                onChange={(e) => handlePrice(e.target.checked)}
              />
            }
            label="Price"
          />
          {isSubscriptionPurchase && (
            <>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={billing_frequency}
                    onChange={(e) => handleBillingFrequency(e.target.checked)}
                  />
                }
                label="Billing Frequency"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={billing_duration}
                    onChange={(e) => handleBillingDuration(e.target.checked)}
                  />
                }
                label="Billing Duration"
              />
            </>
          )}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormLabel style={{ marginRight: 20 }}>Filter Price:</FormLabel>
          <Switch onChange={(e) => handleToggle(e.target.checked)}></Switch>
          {toggleButton && (
            <>
              <RadioGroup>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <FormControlLabel
                    value={true}
                    checked={isGreaterThan}
                    control={<Radio />}
                    label="Greater Than"
                    onChange={(e) => handleChangeRadio(true)}
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Less Than"
                    onChange={(e) => handleChangeRadio(false)}
                  />
                </div>
              </RadioGroup>
              <Input
                autoComplete="off"
                value={filterValue}
                type="text"
                onChange={(e) => setFilterValue(e.target.value)}
                style={{ width: 60 }}
              />
              <ThemeProvider theme={theme}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleClear}
                  style={{ marginLeft: 10, width: 10 }}
                >
                  {" "}
                  Clear
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleFilterPrice}
                  style={{ marginLeft: 40, width: 100 }}
                >
                  {" "}
                  Filter
                </Button>
              </ThemeProvider>
            </>
          )}
        </div>

        <center>
          <div
            className="ag-theme-alpine"
            style={{
              width: 1010,
              height: 400,
              marginTop: 12,
            }}
          >
            <AgGridReact rowData={rowData} columnDefs={columnDefs} />
          </div>
        </center>
      </FormControl>
    </>
  );
}

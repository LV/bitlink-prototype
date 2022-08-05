import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import LoadingButtonsTransition from "./AnimatedButton";
import axios from "axios";
import useGetCustomerDataById from "../Hooks/useGetCustomerDataById";
import useGetMerchantDataById from "../Hooks/useGetMerchantDataById";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
    },
  },
});

export default function OrderDetails() {
  const [item, setItem] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addItem, setAddItem] = useState({
    item: "",
    type: "",
    price: "",
    quantity: "",
  });
  const [rowData, setRowData] = useState([]);

  const merchantId = 3; //hardcode
  const customerId = 4; //hardcode

  const customerData = useGetCustomerDataById(customerId);
  const merchantData = useGetMerchantDataById(merchantId);

  const columnDefs = [
    { field: "item" },
    { field: "type" },
    { field: "quantity" },
    { field: "price" },
  ];

  const current = new Date();
  const date = current.toLocaleDateString();
  const time = current.toLocaleTimeString();

  function handleAddItem() {
    if (!item || !type || !price || !quantity) {
      alert("Please enter in all fields.");
    } else {
      setAddItem({ item, type, price, quantity })
      setRowData(rowData => [...rowData, { item, type, price, quantity }]);
      console.log(rowData)
    }
  }

  return (
    <>
      <div style={{ marginLeft: 22, marginTop: 20 }}>
        <h3>{merchantData ? merchantData.name : ""}</h3>
        <h5>Order ID: 00000001</h5>
        <h5>
          Date: {date} {time}{" "}
        </h5>
      </div>
      <div
        style={{
          marginLeft: 20,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <FormControl variant="standard" style={{ width: 200, marginLeft: 2 }}>
          <InputLabel>Item</InputLabel>
          <Input
            autoComplete="off"
            type="text"
            onChange={(e) => setItem(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" style={{ marginLeft: 20, width: 200 }}>
          <InputLabel>Item Type</InputLabel>
          <Input
            autoComplete="off"
            type="text"
            onChange={(e) => setType(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" style={{ marginLeft: 20, width: 125 }}>
          <InputLabel>Price</InputLabel>
          <Input
            autoComplete="off"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" style={{ marginLeft: 20, width: 75 }}>
          <InputLabel>Quantity</InputLabel>
          <Input
            autoComplete="off"
            type="text"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </FormControl>
        <div style={{ marginLeft: 50 }}>
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleAddItem}
            >
              {" "}
              Add to cart
            </Button>
          </ThemeProvider>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="ag-theme-alpine"
          style={{
            width: 820,
            height: 400,
            marginLeft: 20,
            marginTop: 30,
          }}
        >
          <AgGridReact rowData={rowData} columnDefs={columnDefs} />
        </div>
        <div style={{ marginLeft: 350 }}>
          <div style={{ marginBottom: 20 }}>
            <h5>{customerData ? customerData.name : ""}</h5>
            <p>{customerData ? customerData.email : ""}</p>
          </div>
          <ThemeProvider theme={theme}>
            <LoadingButtonsTransition />
          </ThemeProvider>
        </div>
      </div>
      <h4 style={{ marginLeft: 22 }}>Order Total (USD): $300</h4>
      <h4 style={{ marginLeft: 22 }}>Order Total (BTC): ₿0.000043</h4>
    </>
  );
}

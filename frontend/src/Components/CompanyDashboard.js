import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Tooltip, Typography } from "@mui/material";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
    },
  },
});

export default function CompanyDashboard() {
  const [rowData, setRowData] = useState(null);
  const [columnData, setColumnData] = useState(null);
  const [avgOrderPriceRowData, setAvgOrderPriceRowData] = useState(null);
  const [
    merchantsAtLeastTwoOrdersRowData,
    setMerchantsAtLeastTwoOrdersRowData,
  ] = useState(null);

  // const rowData = [
  //   {
  //     date: "January 1, 2020",
  //     "order number": "1",
  //     "customer ID": "1000",
  //     merchant: "A store",
  //     price: "0.2",
  //     items: "2",
  //     fee: "1.5",
  //   },
  //   {
  //     date: "February 2, 2020",
  //     "order number": "2",
  //     "customer ID": "1001",
  //     merchant: "B store",
  //     price: "0.1",
  //     items: "1",
  //     fee: "1.5",
  //   },
  //   {
  //     date: "March 3, 2020",
  //     "order number": "3",
  //     "customer ID": "1002",
  //     merchant: "C store",
  //     price: "1",
  //     items: "1",
  //     fee: "3",
  //   },
  //   {
  //     date: "April 4, 2020",
  //     "order number": "4",
  //     "customer ID": "1003",
  //     merchant: "D store",
  //     price: "5",
  //     items: "5",
  //     fee: "1.5",
  //   },
  //   {
  //     date: "May 5, 2020",
  //     "order number": "5",
  //     "customer ID": "1004",
  //     merchant: "E store",
  //     price: "2",
  //     items: "10",
  //     fee: "2",
  //   },
  // ];

  // const columnDefs = [
  //   { field: "date" },
  //   { field: "order number" },
  //   { field: "customer ID" },
  //   { field: "merchant" },
  //   { field: "price" },
  //   { field: "items" },
  //   { field: "fee" },
  // ];

  const avgOrderPriceColumnData = [
    { field: "name" },
    { field: "average order price" },
  ];

  const merchantsAtLeastTwoOrdersColumnData = [{ field: "merchants" }];

  function handleGetAvgPrice() {
    setColumnData(avgOrderPriceColumnData);
    setRowData(
      avgOrderPriceRowData.map((i) => ({
        name: i.name,
        "average order price": parseFloat(i.avg),
      }))
    );
  }

  function handleGetMerchantsAtLeastTwoOrders() {
    setColumnData(merchantsAtLeastTwoOrdersColumnData);
    setRowData(
      merchantsAtLeastTwoOrdersRowData.map((i) => ({
        merchants: i.name,
      }))
    );
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAvgOrderPriceByMerchant/")
      .then((response) => {
        const { data } = response;
        setAvgOrderPriceRowData(data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/merchantsAtLeastTwoOrders/")
      .then((response) => {
        const { data } = response;
        setMerchantsAtLeastTwoOrdersRowData(data);
      });
  }, []);

  return (
    <>
      <Navbar cusPage={false} merPage={false} coPage={true} chkPage={false} />
      <h3 style={{ marginLeft: 22, marginTop: 12 }}>Transactions</h3>
      <div
        className="ag-theme-alpine"
        style={{ width: 1400, height: 500, marginLeft: 20 }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnData} />
      </div>
      <div style={{ marginTop: 20, marginLeft: 22 }}>
        <ThemeProvider theme={theme}>
          <Tooltip
            title={
              <>
                <Typography color="inherit" fontSize={12}>
                  Aggregation with Group By:
                </Typography>
                <Typography color="inherit" fontSize={12}>
                  Get average order price per merchant
                </Typography>
              </>
            }
            placement="top"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleGetAvgPrice}
            >
              {" "}
              1
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <>
                <Typography color="inherit" fontSize={12}>
                  Aggregation with Having:
                </Typography>
                <Typography color="inherit" fontSize={12}>
                  Show merchants with at 2 orders
                </Typography>
              </>
            }
            placement="top"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleGetMerchantsAtLeastTwoOrders}
              style={{ marginLeft: 20 }}
            >
              {" "}
              2
            </Button>
          </Tooltip>
        </ThemeProvider>
      </div>
    </>
  );
}

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
  const [mostPopularItemTypeRowData, setMostPopularItemTypeRowData] =
    useState(null);
  const [allCustomersRowData, setAllCustomersRowData] = useState(null);

  const avgOrderPriceColumnData = [
    { field: "name" },
    { field: "average order price" },
  ];

  const merchantsAtLeastTwoOrdersColumnData = [{ field: "merchants" }];

  const mostPopularItemTypeColumnData = [
    { field: "item type" },
    { field: "count" },
  ];

  const allCustomersColumnData = [{ field: "name" }];

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

  function handleGetMostPopularItemType() {
    setColumnData(mostPopularItemTypeColumnData);
    setRowData(
      mostPopularItemTypeRowData
        ? mostPopularItemTypeRowData.map((i) => ({
            "item type": i.item_type,
            count: i.count,
          }))
        : null
    );
  }

  function handleGetCustomers() {
    setColumnData(allCustomersColumnData);
    setRowData(allCustomersRowData);
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/avgOrderPriceByMerchant/")
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

  useEffect(() => {
    axios.get("http://localhost:8080/mostPopularItemType/").then((response) => {
      const { data } = response;
      setMostPopularItemTypeRowData(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/customerBoughtAllMerchant/")
      .then((response) => {
        const { data } = response;
        setAllCustomersRowData(data);
      });
  }, []);

  return (
    <>
      <Navbar cusPage={false} merPage={false} coPage={true} chkPage={false} />
      <h3 style={{ marginLeft: 22, marginTop: 12 }}>Transactions</h3>
      <div
        className="ag-theme-alpine"
        style={{ width: 454, height: 500, marginLeft: 20 }}
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
              style={{ width: 90 }}
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
              style={{ marginLeft: 20, width: 100 }}
            >
              {" "}
              2
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <>
                <Typography color="inherit" fontSize={12}>
                  Nested Aggregation with Group By:
                </Typography>
                <Typography color="inherit" fontSize={12}>
                  Get most popular item type
                </Typography>
              </>
            }
            placement="top"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleGetMostPopularItemType}
              style={{ marginLeft: 20, width: 100 }}
            >
              {" "}
              3
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <>
                <Typography color="inherit" fontSize={12}>
                  Division:
                </Typography>
                <Typography color="inherit" fontSize={12}>
                  Find customers that have bought from every merchant
                </Typography>
              </>
            }
            placement="top"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleGetCustomers}
              style={{ marginLeft: 20, width: 100 }}
            >
              {" "}
              4
            </Button>
          </Tooltip>
        </ThemeProvider>
      </div>
    </>
  );
}

import Navbar from "./Navbar";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createTheme,
  ThemeProvider,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
    },
  },
});

export default function ItemsBought() {
  const [rowData, setRowData] = useState(null);
  const [date, setDate] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const columnDefs = [
    { field: "order_id" },
    { field: "name" },
    { field: "datetime" },
    { field: "item_name" },
    { field: "item_usd_price" },
    { field: "item_quantity" },
  ];

  const customer_id = 4;

  useEffect(() => {
    var params = {
      customer_id: customer_id,
    };

    if (date !== "") {
      params = {
        customer_id: customer_id,
        date: date,
      };
    }

    axios
      .get(`http://localhost:8080/lineitemJoin`, {
        params: params,
      })
      .then((response) => {
        const { data } = response;
        setRowData(data);
      });
  }, [toggleButton]);

  return (
    <>
      <Navbar
        cusPage={false}
        merPage={false}
        coPage={false}
        chkPage={false}
        itPur={true}
      />
      <h3 style={{ marginLeft: 20, marginTop: 12 }}>Items Bought</h3>
      <FormControl variant="standard" style={{ width: 100, marginLeft: 22 }}>
        <InputLabel>YYYY-MM-DD</InputLabel>
        <Input
          autoComplete="off"
          type="text"
          onChange={(e) => setDate(e.target.value)}
        />
      </FormControl>
      <ThemeProvider theme={theme}>
        <Button
          color="primary"
          variant="contained"
          size="small"
          onClick={() => {
            setToggleButton(!toggleButton);
          }}
          style={{ marginTop: 15, marginLeft: 10 }}
        >
          {" "}
          Filter Date
        </Button>
      </ThemeProvider>
      <div
        className="ag-theme-alpine"
        style={{ width: 1205, height: 400, marginLeft: 20, marginTop: 30 }}
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </>
  );
}

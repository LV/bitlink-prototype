import React from "react";
import Navbar from "./Navbar";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


export default function MerchantDashboard() {

  const rowData = [
    {date: 'January 1, 2020', 'order number': '1', 'customer ID': '1000', price: '100', items: '2'},
    {date: 'February 2, 2020', 'order number': '2', 'customer ID': '1001', price: '50', items: '1'},
    {date: 'March 3, 2020', 'order number': '3', 'customer ID': '1002', price: '20', items: '1'},
    {date: 'April 4, 2020', 'order number': '4', 'customer ID': '1003', price: '200', items: '5'},
    {date: 'May 5, 2020', 'order number': '5', 'customer ID': '1004', price: '1000', items: '10'},

  ];

  const columnDefs = [
    {field: 'date'},
    {field: 'order number'},
    {field: 'customer ID'},
    {field: 'price'},
    {field: 'items'}
  ];

    return (
      <>
        <Navbar />
          <h3 style={{marginLeft: 22}}>Sales</h3>
          <div className='ag-theme-alpine' style={{ width: 1005, height: 500, marginLeft: 20 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              // onRowClicked we should retrieve the relevant order from the backend and display the OrderDetails on a new page and provide an option to cancel it?
              // or just add a column with cancel buttons
              onRowClicked={(e) => console.log("row clicked", e.data)}
            />
        </div>
      </>
  );
}

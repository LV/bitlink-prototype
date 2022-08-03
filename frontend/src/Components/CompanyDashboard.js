import React from "react";
import Navbar from "./Navbar";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


export default function CompanyDashboard() {

  const rowData = [
    {date: 'January 1, 2020', 'order number': '1', 'customer ID': '1000', merchant: 'A store', price: '0.2', items: '2', fee: '1.5'},
    {date: 'February 2, 2020', 'order number': '2', 'customer ID': '1001', merchant: 'B store', price: '0.1', items: '1', fee: '1.5'},
    {date: 'March 3, 2020', 'order number': '3', 'customer ID': '1002', merchant: 'C store', price: '1', items: '1', fee: '3'},
    {date: 'April 4, 2020', 'order number': '4', 'customer ID': '1003', merchant: 'D store', price: '5', items: '5', fee: '1.5'},
    {date: 'May 5, 2020', 'order number': '5', 'customer ID': '1004', merchant: 'E store', price: '2', items: '10', fee: '2'},

  ];

  const columnDefs = [
    {field: 'date'},
    {field: 'order number'},
    {field: 'customer ID'},
    {field: 'merchant'},
    {field: 'price'},
    {field: 'items'},
    {field: 'fee'}
  ];

    return (
      <>
        <Navbar />
          <h3 style={{marginLeft: 22}}>Transactions</h3>
          <div className='ag-theme-alpine' style={{ width: 1405, height: 500, marginLeft: 20 }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            />
        </div>
      </>
  );
}

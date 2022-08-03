import React from "react";
import { AgGridReact } from 'ag-grid-react';
import { List, ListItem, ListItemText, createTheme, ThemeProvider } from '@mui/material';
import LoadingButtonsTransition from "./AnimatedButton";

export default function OrderDetails() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#EEEEEE',
      },
    },
  })

  const rowData = [
    { item: 'testName', quantity: '1', price: '$100'},
    { item: 'testName', quantity: '1', price: '$100'},
    { item: 'testName', quantity: '1', price: '$100'}
  ];

  const columnDefs = [
    {field: 'item'},
    {field: 'quantity'},
    {field: 'price'}
  ];


  const current = new Date();
  const date = current.toLocaleDateString()
  const time = current.toLocaleTimeString()

    return (
      <>
          <h3 style={{marginLeft: 22}}>Tesla</h3>
          <h5 style={{marginLeft: 22}}>Order ID: 00000001</h5>
          <h5 style={{marginLeft: 22}}>Date: {date} {time} </h5>
          <div
          style = {{display: 'flex', alignItems: 'space-between'}}
          >          
            <div className='ag-theme-alpine' style={{ width: 610, height: 500, marginLeft: 20}}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
            />
           </div>
          <div
            style = {{marginLeft: 350}}
          >
          <List sx={{width: '100%', maxWidth: 360 }}>
              <ListItem>
                <ListItemText primary={`Customer First Last Name`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`customer@email.com`} />
              </ListItem>
          </List>
          <ThemeProvider theme={theme}>
            {/* <Button
                color="primary"
                variant="contained"
                style={{marginLeft: '15px'}}
                onClick={() => alert("Success!!")}
            > BitLink Checkout</Button> */}
            <LoadingButtonsTransition />
            
          </ThemeProvider>
        </div>
      </div>
      <h4 style={{marginLeft: 22}}>Order Total: $10,000</h4>
    </>
  );
}

import { Button, FormControl } from "@mui/material";
import React from "react";
import TopBar from "./TopBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
  },
})

function CustomerDashboard() {

  const navigate = useNavigate();

  return (
    <>
    <TopBar/>
    <FormControl
      style={{height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h3>BTC Balance: 0.230123</h3>
      <div style={{height: 200, width: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/deposit")}
            // style={{padding: 50}}
            > Deposit 
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigate("/withdrawal")}
            // style={{padding: 50}}
            > Withdrawal 
          </Button>
        </ThemeProvider>
      </div>
    </FormControl>
  </>
  );
}

export default CustomerDashboard;
import { Button } from "@mui/material";
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
    <ThemeProvider theme={theme}>
      <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/deposit")}
          style={{marginRight: 20}}
          > Deposit 
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => navigate("/withdrawal")}
        style={{marginRight: 20}}
        > Withdrawal 
      </Button>
    </ThemeProvider>
  </>
  );
}

export default CustomerDashboard;
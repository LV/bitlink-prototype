import React from "react";
import { Button } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import logo from './logocropped.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#EEEEEE',
      },
    },
  })

function TopBar() {
  const navigate = useNavigate();

    return (
        <div
            style={{backgroundColor: '#EEEEEE', height: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <img src={logo} style={{marginLeft: 10, height: 60}} className="App-logo" alt="logo"/>
            <ThemeProvider theme={theme}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigate(-1)}
                    style={{marginRight: 20}}
                    > Back 
                </Button>
            </ThemeProvider>
        </div>
  );
}

export default TopBar;
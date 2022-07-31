import logo from "./images/logo.png";
import "./App.css";
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3DFC4B',
    },
    secondary: {
      main: '#EEEEEE',
    },
  },
})

const Main = () => {

  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo}  className="App-logo" alt="logo"/>
        <p>
          Bitlink
        </p>
       <div>
        <ThemeProvider theme={theme}>
          <Button
              color="secondary"
              variant="contained"
              style={{marginRight: '30px'}}
              onClick={() => navigate("/customer-dashboard")}
            > Customer Dashboard </Button>
          <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate("/merchant-dashboard")}
          > Merchant Dashboard </Button>
          <Button
              color="secondary"
              variant="contained"
              style={{marginLeft: '30px'}}
              onClick={() => navigate("/company-dashboard")}
          > Company Dashboard </Button>
          </ThemeProvider>
        </div>
      </header>
    </div>
  );
}

export default Main;
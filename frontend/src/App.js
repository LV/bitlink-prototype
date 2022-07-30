import logo from "./images/logo.png";
import "./App.css";
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function App() {

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
            > Customer Dashboard </Button>
          <Button
              color="secondary"
              variant="contained"
          > Merchant Dashboard </Button>
          <Button
              color="secondary"
              variant="contained"
              style={{marginLeft: '30px'}}
          > Company Dashboard </Button>
          </ThemeProvider>
        </div>
      </header>
    </div>
  );
}

export default App;

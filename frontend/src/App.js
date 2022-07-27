import logo from "./logo.svg";
import "./App.css";
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bitlink
          <Button
            color="primary"
            variant="contained"
          > HELLO </Button>
          <Switch
            color="error"
          />
        </p>
      </header>
    </div>
  );
}

export default App;

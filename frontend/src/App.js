import logo from "./images/logo.png";
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
        </p>
        <Button
            color="primary"
          > HELLO </Button>
          <Switch
            color="primary"
          />
      </header>
    </div>
  );
}

export default App;

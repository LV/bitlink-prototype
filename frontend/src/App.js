import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CustomerDashboard from "./Components/CustomerDashboard";
import Dashboard from "./Components/Dashboard";
import Main from "./Main";
import WithdrawalDeposit from "./Components/WithdrawalDeposit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/customer-dashboard' element={<CustomerDashboard/>}/>
        <Route path='/merchant-dashboard' element={<Dashboard/>}/>
        <Route path='/company-dashboard' element={<Dashboard/>}/>
        <Route path='/checkout' element={<Dashboard/>}/>
        <Route path='/withdrawal' element={<WithdrawalDeposit isDeposit={false}/>}/>
        <Route path='/deposit' element={<WithdrawalDeposit isDeposit={true}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
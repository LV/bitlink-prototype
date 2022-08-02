import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Checkout from "./Components/Checkout";
import CompanyDashboard from "./Components/CompanyDashboard";
import CustomerDashboard from "./Components/CustomerDashboard";
import MerchantDashboard from "./Components/MerchantDashboard";
import Main from "./Main";
import WithdrawalDeposit from "./Components/WithdrawalDeposit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/customer-dashboard' element={<CustomerDashboard/>}/>
        <Route path='/merchant-dashboard' element={<MerchantDashboard/>}/>
        <Route path='/company-dashboard' element={<CompanyDashboard/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/withdrawal' element={<WithdrawalDeposit isDeposit={false}/>}/>
        <Route path='/deposit' element={<WithdrawalDeposit isDeposit={true}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
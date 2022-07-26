import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "./Components/Checkout";
import CompanyDashboard from "./Components/CompanyDashboard";
import CustomerDashboard from "./Components/CustomerDashboard";
import OrderSelection from "./Components/OrderSelection";
import MerchantDashboard from "./Components/MerchantDashboard";
import Main from "./Main";
import SignUp from "./Components/SignUp";
import ItemsBought from "./Components/ItemsBought";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/items-bought" element={<ItemsBought />} />
        <Route path="/merchant-dashboard" element={<MerchantDashboard />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-selection" element={<OrderSelection />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

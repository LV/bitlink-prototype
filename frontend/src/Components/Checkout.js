import React from "react";
import Navbar from "./Navbar";
import OrderDetails from "./OrderDetails";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
    const notify = () => toast("Wow so easy!");

    return (
      <>
        <Navbar cusPage={false} merPage={false} coPage={false} chkPage={true} />
        <OrderDetails />
      </>
      
      
  );
}

export default Checkout;

import React from "react";
import Navbar from "./Navbar";
import OrderDetails from "./OrderDetails";

function Checkout() {

    return (
      <>
      <Navbar cusPage={false} merPage={false} coPage={false} chkPage={true} />
      <OrderDetails/>
      </>
      
  );
}

export default Checkout;

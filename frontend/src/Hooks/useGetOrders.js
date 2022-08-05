import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetOrders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/order/`).then((response) => {
      const { data } = response;
      setOrders(data[0]);
    });
  }, [orders]);

  return orders;
}

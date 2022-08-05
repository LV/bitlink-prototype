import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetCustomerDataById(customerId) {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/${customerId}`)
      .then((response) => {
        const { data } = response;
        setCustomerData(data[0]);
      });
  }, [customerId, customerData]);

  return customerData;
}

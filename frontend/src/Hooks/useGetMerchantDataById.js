import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetCustomerDatabyId(merchantId) {
  const [merchantData, setMerchantData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/merchant/${merchantId}`)
      .then((response) => {
        const { data } = response;
        setMerchantData(data[0]);
      });
  }, [merchantId, merchantData]);

  return merchantData;
}

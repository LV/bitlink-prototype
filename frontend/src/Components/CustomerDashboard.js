import { Button, FormControl } from "@mui/material";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WithdrawalDeposit, { BitcoinAddress } from "./WithdrawalDeposit";
import UpdateInformation from "./UpdateInformation";
import axios from "axios";
import useGetCustomerDataById from "../Hooks/useGetCustomerDataById";
import {useNavigate} from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
    },
  },
});

export default function CustomerDashboard() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [showUpdateInformation, setShowUpdateInformation] = useState(false);
  const [customerWalletBalance, setCustomerWalletBalance] = useState(null);
  const [balance, setBalance] = useState(0);
  const [customerName, setCustomerName] = useState("");

  const customerId = 4; //hardcode
  const customerData = useGetCustomerDataById(customerId);
  const navigate = useNavigate();

  useEffect(() => {
    if (customerData) {
      axios
        .get(`http://localhost:8080/wallet/${customerData.wallet_id}`)
        .then((response) => {
          const { data } = response;
          setCustomerWalletBalance(Number(data[0].btc_amount));
        });
    }
  }, [customerData]);

  useEffect(() => {
    if (customerWalletBalance) {
      setBalance(customerWalletBalance);
    }
  }, [customerWalletBalance]);

  useEffect(() => {
    if (customerData) {
      setCustomerName(customerData.name);
    }
  }, [customerData]);

  function handleDeposit() {
    setShowDeposit((prev) => !prev);

    if (showWithdrawal) {
      setShowWithdrawal(false);
    }
    if (showUpdateInformation) {
      setShowUpdateInformation(false);
    }
  }

  function handleWithdrawal() {
    setShowWithdrawal((prev) => !prev);

    if (showDeposit) {
      setShowDeposit(false);
    }
    if (showUpdateInformation) {
      setShowUpdateInformation(false);
    }
  }

  function handleUpdateInformation() {
    setShowUpdateInformation((prev) => !prev);

    if (showDeposit) {
      setShowDeposit(false);
    }
    if (showWithdrawal) {
      setShowWithdrawal(false);
    }
  }

  function sendDeposit(updatedBalance) {
    if (isNaN(updatedBalance)) {
      alert("Please enter in numerical digits only.");
    } else {
      const newBalance = balance + Number(updatedBalance);
      setBalance(newBalance);
    }
  }

  function sendWithdrawal(updatedBalance) {
    let newBalance = 0;

    if (isNaN(updatedBalance)) {
      alert("Please enter in numerical digits only.");
    } else {
      newBalance = balance - Number(updatedBalance);
      if (newBalance < 0) {
        alert("Negative balance, please try again.");
      } else {
        setBalance(newBalance);
      }
    }
  }

  function handleFinishTransaction() {
    setShowDeposit(false);
    setShowWithdrawal(false);
    if (balance) {
      const updatedData = {
        wallet_id: customerData.wallet_id,
        btc_amount: balance,
      };
      axios.put(
        `http://localhost:8080/wallet/${customerData.wallet_id}`,
        updatedData
      );
    }
  }

  return (
    <>
      <Navbar cusPage={true} merPage={false} coPage={false} chkPage={false} />
      <FormControl
        style={{
          paddingTop: 40,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <h1>Welcome {customerName}!</h1>
        <div style={{ marginTop: 20 }}>
          <h3>BTC Balance: {balance}</h3>
        </div>
        <div
          style={{
            height: 100,
            width: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 30,
          }}
        >
          <ThemeProvider theme={theme}>
            <Button color="primary" variant="contained" onClick={handleDeposit}>
              {" "}
              Deposit
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleWithdrawal}
            >
              {" "}
              Withdrawal
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdateInformation}
            >
              {" "}
              Update Information
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate("/items-bought")}
            >
              {" "}
              Items Bought
            </Button>
          </ThemeProvider>
        </div>
      </FormControl>
      {showUpdateInformation && (
        <UpdateInformation customerData={customerData} />
      )}
      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {(showDeposit || showWithdrawal) && <BitcoinAddress />}
      </div>
      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {showDeposit && (
          <WithdrawalDeposit isDeposit={true} sendDeposit={sendDeposit} />
        )}
        {showWithdrawal && (
          <WithdrawalDeposit
            isDeposit={false}
            sendWithdrawal={sendWithdrawal}
          />
        )}
      </div>
      {showDeposit || showWithdrawal ? (
        <div
          style={{
            display: "flex",
            height: 50,
            justifyContent: "flex-end",
            marginRight: 80,
            marginTop: 10,
          }}
        >
          <ThemeProvider theme={theme}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleFinishTransaction}
            >
              {" "}
              Finish transaction
            </Button>
          </ThemeProvider>
        </div>
      ) : null}
    </>
  );
}

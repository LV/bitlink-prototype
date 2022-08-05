import { Button, FormControl } from "@mui/material";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WithdrawalDeposit, { BitcoinAddress } from "./WithdrawalDeposit";
import axios from "axios";

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
  const [customerData, setCustomerData] = useState(null);
  const [customerWalletBalance, setCustomerWalletBalance] = useState(null);
  const [balance, setBalance] = useState(0);
  const [customerName, setCustomerName] = useState("");

  const customerId = 4; //hardcode

  useEffect(() => {
    axios
      .get(`http://localhost:8080/customer/${customerId}`)
      .then((response) => {
        const { data } = response;
        setCustomerData(data[0]);
      });
  }, [customerId]);

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
  }

  function handleWithdrawal() {
    setShowWithdrawal((prev) => !prev);

    if (showDeposit) {
      setShowDeposit(false);
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
        setBalance(newBalance.toFixed(8));
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
    console.log(balance);
  }

  return (
    <>
      <Navbar cusPage={true} merPage={false} coPage={false} chkPage={false} />
      <FormControl
        style={{
          paddingTop: 50,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <h1>Welcome {customerName}!</h1>
        <h3>BTC Balance: {balance}</h3>
        <div
          style={{
            height: 100,
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
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
          </ThemeProvider>
        </div>
      </FormControl>
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
      <div style={{ display: "flex", height: 50, justifyContent: "flex-end" }}>
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
    </>
  );
}

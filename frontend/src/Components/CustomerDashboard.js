import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WithdrawalDeposit, { BitcoinAddress } from "./WithdrawalDeposit";

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
  const [balance, setBalance] = useState(1.61803398);

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
    const newBalance = balance + Number(updatedBalance);
    setBalance(newBalance);
  }

  function sendWithdrawal(updatedBalance) {
    const newBalance = balance - Number(updatedBalance);

    if (newBalance < 0) {
      alert("Negative balance, please try again.");
    } else {
      setBalance(newBalance);
    }
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
        <h1>Welcome Bob Bobson!</h1>
        <h3>BTC Balance: {balance.toFixed(8)}</h3>
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
    </>
  );
}

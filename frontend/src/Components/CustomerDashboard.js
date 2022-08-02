import { Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import TopBar from "./TopBar";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WithdrawalDeposit from "./WithdrawalDeposit";

const theme = createTheme({
  palette: {
    primary: {
      main: '#EEEEEE',
    },
  },
})

export default function CustomerDashboard() {

  const [showDeposit, setShowDeposit] = useState(false)
  const [showWithdrawal, setShowWithdrawal] = useState(false)
  const [balance, setBalance] = useState(10)

  function handleDeposit() {
    setShowDeposit(prev => !prev);
  }

  function handleWithdrawal() {
    setShowWithdrawal(prev => !prev);
  }

  function sendDeposit(updatedBalance) {
    const newBalance = balance + Number(updatedBalance)
    setBalance(newBalance);
  };

  function sendWithdrawal(updatedBalance) {
    const newBalance = balance - Number(updatedBalance)

    if (newBalance < 0) {
      alert("Negative balance, please try again.")
    } else {
      setBalance(newBalance);
    }
  };

  return (
    <>
    <TopBar/>
    <FormControl
      style={{height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h3>BTC Balance: {balance}</h3>
      <div style={{height: 200, width: 400, display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
        <ThemeProvider theme={theme}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleDeposit}
            > Deposit 
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleWithdrawal}
            > Withdrawal 
          </Button>
        </ThemeProvider>
      </div>
      {showDeposit && <WithdrawalDeposit isDeposit={true} sendDeposit={sendDeposit}/>}
      {showWithdrawal && <WithdrawalDeposit isDeposit={false} sendWithdrawal={sendWithdrawal}/>}
    </FormControl>
  </>
  );
}
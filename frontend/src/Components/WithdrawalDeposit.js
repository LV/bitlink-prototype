import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import HashLoader from "react-spinners/HashLoader";
import { TextField, Button, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
    },
  },
});

export function BitcoinAddress() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  });

  if (loading === true) {
    return (
      <div>
        <HashLoader
          color={"#c7c7c7"}
          loading={loading}
          size={50}
          style={{ marginTop: 20 }}
        />
      </div>
    );
  } else {
    return (
      <div style={{ marginTop: 70 }}>
        <center>
          <QRCode
            size={125}
            value="bitcoin:bc1qs9ynug9k0m9llzwg0ljs66xu5hwetc4sy8hyuu?amount=&message=1.24"
          />
        </center>
        <input
          type="text"
          name="captcha"
          disabled
          id="bitcoinAddr"
          value="bc1qs9ynug9k0m9llzwg0ljs66xu5hwetc4sy8hyuu"
          style={{ marginTop: 10 }}
        ></input>
      </div>
    );
  }
}

export default function WithdrawalDeposit(props) {
  const { isDeposit, sendDeposit, sendWithdrawal } = props;

  const [value, setValue] = useState("");

  const type = isDeposit ? "Deposit" : "Withdrawal";

  function handleClear() {
    setValue("");
  }

  function handleWithdrawlDeposit() {
    isDeposit ? sendDeposit(value) : sendWithdrawal(value);
  }

  return (
    <FormControl style={{ paddingTop: 60 }}>
      <h5>Enter amount to {type.toLowerCase()}:</h5>
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="off"
        style={{ marginTop: 10 }}
      />
      <div
        style={{
          display: "flex",
          height: 80,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemeProvider theme={theme}>
          <Button color="primary" variant="contained" onClick={handleClear}>
            {" "}
            Clear
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleWithdrawlDeposit}
          >
            {" "}
            Submit
          </Button>
        </ThemeProvider>
      </div>
    </FormControl>
  );
}

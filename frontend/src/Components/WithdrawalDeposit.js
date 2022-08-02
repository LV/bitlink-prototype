import React, {useState} from "react";
import { TextField, Button, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#EEEEEE',
      },
    },
  })

export default function WithdrawalDeposit(props) {
    const { isDeposit, sendDeposit, sendWithdrawal } = props;

    const [value, setValue] = useState(0)

    const type = isDeposit ? "Deposit" : "Withdrawal"

    function handleClear() {
      setValue("")
    }

    function handleWithdrawlDeposit() {
      isDeposit ? sendDeposit(value) : sendWithdrawal(value)
    }

    return (
      <FormControl
          style={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <h3>Enter in amount to {type.toLowerCase()}:</h3>
      <TextField 
        id="outlined-basic" 
        label="Amount" 
        variant="outlined"
        value={value}
        onChange={e => setValue(e.target.value)}
        autoComplete='off'
        />
      <div style={{display: 'flex'}}>
        <ThemeProvider theme={theme}>
            <Button
                color="primary"
                variant="contained"
                style={{margin: 20}}
                onClick={handleClear}
                > Clear
            </Button>
            <Button
                color="primary"
                variant="contained"
                style={{margin: 20}}
                onClick={handleWithdrawlDeposit}
                > Submit 
            </Button>
        </ThemeProvider>
      </div>
      </FormControl>
  );
}
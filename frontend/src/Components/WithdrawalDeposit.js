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
      <FormControl style={{display: 'flex'}}>
      <h3>Enter amount to {type.toLowerCase()}:</h3>
      <TextField 
        id="outlined-basic" 
        label="Amount" 
        variant="outlined"
        value={value}
        onChange={e => setValue(e.target.value)}
        autoComplete='off'
        />
      <div style={{display: 'flex', height: 80, alignItems: 'center', justifyContent: 'space-between'}}>
        <ThemeProvider theme={theme}>
            <Button
                color="primary"
                variant="contained"
                onClick={handleClear}
                > Clear
            </Button>
            <Button
                color="primary"
                variant="contained"
                onClick={handleWithdrawlDeposit}
                > Submit 
            </Button>
        </ThemeProvider>
      </div>
      </FormControl>
  );
}
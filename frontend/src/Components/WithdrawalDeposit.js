import React, {useState} from "react";
import TopBar from "./TopBar";
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
    const { isDeposit } = props;

    const [value, setValue] = useState(0)

    const type = isDeposit ? "Deposit" : "Withdrawal"

    function handleSubmit() {
      console.log(value)
  }

    return (
        <>
            <TopBar/>
            <FormControl
                style={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h3>Enter in amount to {type.toLowerCase()}:</h3>
            <TextField 
              id="outlined-basic" 
              label="Amount" 
              variant="outlined"
              onChange={e => setValue(e.target.value)}
              />
            <ThemeProvider theme={theme}>
                <Button
                    color="primary"
                    variant="contained"
                    style={{margin: 20}}
                    onClick={handleSubmit}
                    > Submit 
                </Button>
            </ThemeProvider>
            </FormControl>
        </>
  );
}
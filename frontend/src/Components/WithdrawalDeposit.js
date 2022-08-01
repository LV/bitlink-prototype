import React from "react";
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

function handleSubmit(e) {
    console.log(e)
}

export default function WithdrawalDeposit(props) {
    const { isDeposit } = props;

    const type = isDeposit ? "Deposit" : "Withdrawal"

    return (
        <>
            <TopBar/>
            <FormControl
                style={{display: 'flex', alignItems: 'center'}}>
            <h3>Enter in amount to {type.toLowerCase()}:</h3>
            <TextField id="outlined-basic" label="Amount" variant="outlined" />
            <ThemeProvider theme={theme}>
                <Button
                    color="primary"
                    type="number"
                    variant="contained"
                    style={{margin: 20}}
                    onClick={e => handleSubmit(e)}
                    > Submit </Button>
            </ThemeProvider>
            </FormControl>
        </>
  );
}
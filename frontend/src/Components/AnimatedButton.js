import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function LoadingButtonsTransition() {
  const [loading, setLoading] = React.useState(false);
  const [start, setStart] = React.useState(true);

  const theme = createTheme({
    palette: {
      secondary: {
        main: indigo[500],
      },
    },
  });

  function handleClick() {
    setLoading(true);
      const timer = setTimeout(() => setStart(false), 2500);
      return () => clearTimeout(timer);
  }

  if(start) {
    return (
      <Box>
        <ThemeProvider theme={theme}>
          <LoadingButton
            color="secondary"
            onClick={handleClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<CurrencyBitcoinIcon />}
            variant="contained"
          >
            Pay with Bitlink
          </LoadingButton>
        </ThemeProvider>
      </Box>
    );
  } else {
    return (
      <Box>
        <ThemeProvider theme={theme}>
          <LoadingButton
            color="success"
            onClick={handleClick}
            loading={false}
            loadingPosition="start"
            startIcon={<CheckCircleOutlineIcon />}
            variant="contained"
          >
            Payment Successful
          </LoadingButton>
        </ThemeProvider>
      </Box>
    );
  }
}

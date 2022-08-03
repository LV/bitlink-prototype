import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MovingComponent from 'react-moving-text'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import axios from 'axios';

export default function LoadingButtonsTransition() {
  const [loading, setLoading] = React.useState(false);
  const [start, setStart] = React.useState(true);
  const [bitcoinPrice, setBitcoinPrice] = React.useState(null);
  const getBitcoinPrice = async () => {
    axios
      .get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false')
      .then(res => {
        setBitcoinPrice(res.data.bitcoin.usd);
      })
      .catch(error => console.log(error));
    };

  const theme = createTheme({
    palette: {
      secondary: {
        main: indigo[500],
      },
    },
  });

  React.useEffect(() => {
    getBitcoinPrice();
  }, []);
  

  function handleClick() {
    setLoading(true);
      const timer = setTimeout(() => setStart(false), 2500);
      return () => clearTimeout(timer);
  }

  if(start) {
    return (
      <Box>
        <ThemeProvider theme={theme}>
          <center>
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
            <MovingComponent
              type="slideInFromBottom"
              duration="1000ms"
              delay="0s"
              direction="normal"
              timing="ease"
              iteration="1"
              fillMode="none">
              <small>1 BTC  =  {bitcoinPrice} USD</small>
            </MovingComponent>
          </center>
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

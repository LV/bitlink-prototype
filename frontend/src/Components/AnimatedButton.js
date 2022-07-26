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
import useGetBitcoinFxRate from "../Hooks/useGetBitcoinFxRate";

export default function LoadingButtonsTransition(props) {
  const [loading, setLoading] = React.useState(false);
  const [start, setStart] = React.useState(true);

  const theme = createTheme({
    palette: {
      secondary: {
        main: indigo[500],
      },
    },
  });

  const bitcoinRate = 1 / useGetBitcoinFxRate();

  const createItemType = (item_name, item_type) => {
    axios
      .post("http://localhost:8080/itemType", { item_name, item_type })
  }

  function handleClick() {
    setLoading(true);
    const timer = setTimeout(() => setStart(false), 2500);
    const customer_id = props.customer_id
    const company_account_number = 1000000001 //hardcode
    const merchant_id = props.merchant_id
    const wallet_id = customer_id
    const fee_percentage = props.fee_percentage
    const item_brand = props.item_brand
    const otp = []
    console.log(otp)
    props.cart.forEach((item) =>
      createItemType(item.item, item.type)
    )
    props.cart.forEach((item) => {
      otp.push(
        {
          "item_name": item.item,
          "item_brand": item_brand,
          "item_usd_price": item.price,
          "item_quantity": item.quantity
        }
      )
    })
    const subscription = {}
    axios
      .post("http://localhost:8080/order", {
        customer_id, company_account_number, merchant_id, wallet_id, fee_percentage,
        bitcoinRate, otp, subscription
      })
      .then((response) => {
      });
    return () => clearTimeout(timer);
  }

  if (start) {
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
              <small>1 BTC  =  {1 / bitcoinRate} USD</small>
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

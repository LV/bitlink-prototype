import { useState, useEffect } from "react";
import axios from "axios";

export default function useGetBitcoinFxRate() {
    const [bitcoinPrice, setBitcoinPrice] = useState(null);

    useEffect(() => {
        axios
            .get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false')
            .then((response) => {
                setBitcoinPrice(response.data.bitcoin.usd);
            });
    }, [bitcoinPrice]);

    return bitcoinPrice;
}
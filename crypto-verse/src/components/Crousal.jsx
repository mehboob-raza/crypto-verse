/* eslint-disable react-refresh/only-export-components */
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Crypto } from "../context/CryptoContext";
import { TrendingCoins } from "../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
// import { numberWithCommas } from "./CoinsTable";

const useStyles = makeStyles(() => ({
  crousal: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Crousal = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency, symbol } = useContext(Crypto);
  const fetchTrendingcoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  console.log(trending, "trending");
  useEffect(() => {
    fetchTrendingcoins();
  }, [currency]);

  const items = trending.map((coin, i) => {
    let profit = coin.price_change_percentage_24h >= 0;
    return (
      <Link key={i} className={classes.crousal} to={"/coins/${coin.id}"}>
        <img
          src={coin?.image}
          alt={coin.name}
          height={80}
          style={{
            marginBottom: 10,
          }}
        />
        <span>
          {coin?.symbol}
          <span
            style={{
              color: profit > 0 ? "rgb(14,203,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <Box className={classes.crousal}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </Box>
  );
};

export default Crousal;

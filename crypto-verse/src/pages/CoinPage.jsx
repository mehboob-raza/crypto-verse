import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Crypto } from "../context/CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import CoinInfo from "../components/CoinInfo";
import { numberWithCommas } from "../components/Crousal";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(Crypto);
  console.log(id, "id", currency, symbol, coin);

  const fetchCOin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCOin();
  }, []);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;
  return (
    <Box>
      <Container>
        <Grid container>
          <Grid item md={4} sm={12} xs={12}>
            {/* Sidebar  */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "25px",
                borderRight: { md: "2px solid grey", sm: "none" },
              }}
            >
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="180px"
                style={{ marginBottom: "20px" }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  fontFamily: "Montserrat",
                }}
              >
                {coin?.name}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Montserrat", mb: 2 }}
              >
                {coin?.description.en.split(". ")[0]}.
              </Typography>
              <Box
                sx={{
                  alignSelf: { xs: "start", sm: "center" },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Montserrat", mb: 2 }}
                >
                  Rank : {coin?.market_cap_rank}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Montserrat", mb: 2 }}
                >
                  Current Price: {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontFamily: "Montserrat", mb: 2 }}
                >
                  Market Cap: {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                  )}
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* Charts  */}
          <Grid item md={8} sm={12} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <CoinInfo coin={coin} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoinPage;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { CoinList } from "../config/api";
import axios from "axios";
import { Crypto } from "../context/CryptoContext";
import { array } from "../dataSource";
import { numberWithCommas } from "./Crousal";
import {
  Box,
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  styled,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  root: {
    "--TextField-brandBorderColor": "#fff",
    "--TextField-brandBorderHoverColor": "#fff",
    "--TextField-brandBorderFocusedColor": "#6F7E8C",
    "& label.Mui-focused": {
      color: "#fff",
    },
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
  },
}));

const CustomTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#fff",
  },
  "& .MuiInputBase-input": {
    color: "#fff",
  },
}));

const CoinsTable = () => {
  console.log("array", array);
  const [coins, setCoins] = useState([]);
  const [filterCoins, setFilterdCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const history = useNavigate();
  const classes = useStyles();
  const { currency, symbol } = useContext(Crypto);

  console.log(filterCoins, "setFilterCoins");
  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
      setFilterdCoins(data);
      setLoading(false);
    } catch (error) {
      console.error("An error", error);
    }
  }, [currency]);

  console.log(coins, "coin list");

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  // const SearchFilter = coins.filter((coin) => {
  //   return (
  //     coin.name.toLowerCase().includes(search) ||
  //     coin.symbol.toLowerCase().includes(search)
  //   );
  // });
  // setFData(SearchFilter);
  // console.log(SearchFilter, "Search");

  const handleSearch = (e) => {
    if (!e.target.value) {
      setFilterdCoins(coins);
      return;
    }
    setFilterdCoins(
      coins.filter((coin) => {
        return (
          coin.name.toLowerCase().includes(e.target.value) ||
          coin.symbol.toLowerCase().includes(e.target.value)
        );
      })
    );
  };
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ m: 18, fontFamily: "Montserrat" }}>
            Cryptocurrency prices by Market Cap
          </Typography>
          <CustomTextField
            label="Search for a Cryptocurrency"
            variant="outlined"
            sx={{
              mb: 10,
              width: "100%",
            }}
            InputProps={{
              sx: {
                color: "white",
              },
            }}
            placeholder="Search for a Cryptocurrency"
            onChange={handleSearch}
          />

          <TableContainer>
            {loading ? (
              <LinearProgress
                sx={{
                  backgroundColor: "gold",
                }}
              />
            ) : (
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: "#EEBC1D",
                  }}
                >
                  <TableRow>
                    {["Coin", "Price", "24th Change", "Market Cap"].map(
                      (head, i) => (
                        <TableCell
                          key={i}
                          sx={{
                            color: "black",
                            fontWeight: "bold",
                            fontFamily: "Montserrat",
                          }}
                          align={head === "Coin" ? "inherit" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filterCoins
                    ?.slice((page - 1) * 10, (page - 1) * 10 + 10)
                    .map((row, i) => {
                      const profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          key={i}
                          onClick={() => history(`/coins/${row.id}`)}
                          className={classes.row}
                        >
                          <TableCell
                            className={classes.textColor}
                            component="th"
                            scope="row"
                            sx={{
                              display: "flex",
                              // flexDirection: "column",
                              width: "100%",
                              alignItems: "center",
                              gap: 3,
                            }}
                            align="center"
                          >
                            <img
                              src={row?.image}
                              alt={row?.name}
                              height="50px"
                              width="50px"

                              // style={{ marginBottom: 10 }}
                            />
                            <Box
                              sx={{ display: "flex", flexDirection: "column" }}
                            >
                              <Typography
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: 22,
                                }}
                              >
                                {row.symbol}
                              </Typography>
                              <Typography
                                variant="h6"
                                style={{ color: "darkgrey" }}
                              >
                                {row.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color: "#fff",
                            }}
                          >
                            {symbol}{" "}
                            {numberWithCommas(row.current_price.toFixed(2))}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color: profit > 0 ? "rgb(14,203,129)" : "red",
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}{" "}
                            {row.price_change_percentage_24h.toFixed(2)}%
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              color: "#fff",
                            }}
                          >
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={(filterCoins?.length / 10).toFixed(0)}
            sx={{
              padding: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: classes.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 850);
            }}
          />
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default CoinsTable;

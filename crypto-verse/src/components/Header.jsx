import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Crypto } from "../context/CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    FontFamily: "Montserrat",
    fontWeight: "800",
    cursor: "pointer",
  },
}));
const Header = () => {
  const classes = useStyles();
  const history = useNavigate();

  const { currency, setCurrency } = useContext(Crypto);
  console.log("currency in head....", currency);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const currencyChangeHandler = (e) => {
    setCurrency(e.target.value);

    console.log(e.target, "currency");
  };
  return (
    <ThemeProvider theme={theme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
              onClick={() => history("/")}
            >
              Crypto Verse
            </Typography>
            <Select
              variant="outlined"
              defaultValue={currency}
              value={currency}
              onChange={(e) => currencyChangeHandler(e)}
              sx={{
                width: 100,
                height: 40,
                marginLeft: 15,
                color: "#fff",

                // Change the border color
                "&.MuiOutlinedInput-root": {
                  borderColor: "#fff",
                },

                // Change the arrow color
                "& .css-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
                  color: "#fff",
                },
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"PKR"}>PKR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;

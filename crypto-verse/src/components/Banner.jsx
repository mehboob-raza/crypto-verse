import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import banner from "../assets/banner2.jpg";
import Crousal from "./Crousal";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: `url(${banner})`,
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-between",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));
const Banner = () => {
  const classes = useStyles();
  return (
    <Box className={classes.banner}>
      <Container className={classes.bannerContent}>
        <Box className={classes.tagline}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Verse
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgray",
              fontFamily: "Montserrat",
              textTransform: "capitalize",
            }}
          >
            Get all info about your favorite ctypto currencies
          </Typography>
        </Box>
        <Crousal />
      </Container>
    </Box>
  );
};

export default Banner;

import {Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import logo from '../assets/logo.png';
const Header = ({ name, lastname, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingX: "10px",
        paddingY: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
       <img src={logo} width={"100px"}/>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            color: "#4B46B8",
            top: "40%",
            left: "40%",
            background:
              "linear-gradient(90deg, #4B46B8 11.75%, #03A7C0 78.25%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
          }}
        >
          {name + lastname}
        </Typography>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Header;

Header.propTypes = {
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

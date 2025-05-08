"use client";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const FancyButton = styled(Button)(() => ({
  backgroundColor: "#000",
  border: "1px solid #A9232C",
  borderRadius: 0,
  color: "#A9232C",
  fontFamily: "'ojuju', sans-serif",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "#A9232C",
    color: "#000",
  },
}));

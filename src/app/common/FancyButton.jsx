"use client";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const FancyButton = styled(Button)(() => ({
  backgroundColor: "#000",
  border: "1px solid #ff477b",
  borderRadius: 0,
  color: "#ff477b",
  fontFamily: "'ojuju', sans-serif",
  fontWeight: "500",
  "&:hover": {
    backgroundColor: "#ff477b",
    color: "#000",
  },
}));

"use client";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const FancyButton = styled(Button)(() => ({
  backgroundColor: "transparent",
  border: "1px solid var(--rust)",
  borderRadius: 0,
  color: "var(--rust)",
  fontFamily: "var(--font-courier), 'Courier New', monospace",
  fontWeight: "400",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  lineHeight: 1,
  paddingTop: "0.55em",
  paddingBottom: "0.45em",
  boxShadow: "none",
  transition: "background-color 0.2s ease, color 0.2s ease",
  "&:hover": {
    backgroundColor: "var(--rust)",
    color: "#fff",
    boxShadow: "none",
  },
}));

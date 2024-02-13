import { colors } from "@mui/material";

export const getDesignTokens = ({ mode }) => ({
  palette: {
    mode,
    ...(mode == "light"
      ? {
          primary: {
            main: "#00AC47",
            dark: "#00AC47",
            light: "#00AC47",
          },
          secondary: {
            main: colors.common.white,
          },
        }
      : {
          primary: {
            main: "#00AC47",
            dark: "#00AC47",
            light: "#00AC47",
          },
          secondary: {
            main: colors.common.white,
          },
        }),
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    button: {
      textTransform: "none",
    },
  },
});

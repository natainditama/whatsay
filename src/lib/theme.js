import { colors } from "@mui/material";

export const getDesignTokens = ({ mode }) => ({
  palette: {
    mode,
    ...(mode == "light"
      ? {
          primary: {
            main: "hsl(142.1, 76.2%, 36.3%)",
          },
          secondary: {
            main: colors.common.white,
          },
          background: {
            default: "hsl(0, 0%, 100%)",
          },
          text: {
            main: "hsl(240, 10%, 3.9%)",
          },
        }
      : {
          primary: {
            main: "hsl(142.1, 76.2%, 36.3%)",
          },
          secondary: {
            main: colors.common.white,
          },
          text: {
            main: "hsl(0, 0%, 100%)",
          },
          background: {
            default: "hsl(240, 10%, 3.9%)",
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

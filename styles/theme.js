import { colors } from "@mui/material";

export const getDesign = ({ mode }) => ({
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
      : custom),
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    fontWeightLight: 400,
    button: {
      textTransform: "none",
    },
  },
});

const custom = {
  primary: {
    main: "#00AC47",
    dark: "#00AC47",
    light: "#00AC47",
  },
  secondary: {
    main: colors.common.white,
  },
};

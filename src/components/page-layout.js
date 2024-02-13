import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "@/components/index";
import { getDesignTokens } from "@/lib/theme";
import { getMode } from "@/redux/slices/mode-slice";

export function PageLayout({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector(({ mode }) => mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode )), [mode]);

  useEffect(() => {
    dispatch(getMode());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="sm" sx={{ py: 4 }}>
        {children}
      </Container>
    </ThemeProvider>
  );
}

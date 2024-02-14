import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getMode } from "@/redux/slices/mode-slice";
import Container from "@mui/material/Container";
import { getDesignTokens } from "@/lib/theme";
import { Header } from "@/components/index";
import { useEffect, useMemo } from "react";

export function PageLayout({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector(({ mode }) => mode);
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

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

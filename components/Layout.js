import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Header } from "@components/index";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { getMode } from "@redux/features/modeSlice";
import { getDesign } from "@styles/theme";

function Layout({ children }) {
  const dispatch = useDispatch();
  const mode = useSelector(({ mode }) => mode);
  const theme = useMemo(() => createTheme(getDesign(mode)), [mode]);

  useEffect(() => {
    dispatch(getMode());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container maxWidth="sm" sx={{ py: 4 }}>
          {children}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Layout;

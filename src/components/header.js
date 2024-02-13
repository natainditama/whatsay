import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppBar,
  Container,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { Navbar } from "@/components/index";
import { setMode } from "@/redux/slices";

export function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(setMode(theme.palette.mode == "dark" ? "light" : "dark"));
  };

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: theme.spacing(1.5),
    "@media all": {
      minHeight: "min-content",
    },
  }));

  return (
    <>
      <AppBar position="static" sx={{ boxShadow: 0 }} enableColorOnDark>
        <Container maxWidth="sm">
          <StyledToolbar disableGutters>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant="h5">Whatsay</Typography>
              <IconButton
                size="large"
                aria-label="search"
                color="inherit"
                onClick={handleTheme}
              >
                {theme?.palette.mode === "dark" ? (
                  <FontAwesomeIcon icon={faSun} size="sm" />
                ) : (
                  <FontAwesomeIcon icon={faMoon} size="sm" />
                )}
              </IconButton>
            </Stack>
            <Navbar />
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
}

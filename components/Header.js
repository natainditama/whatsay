import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  styled,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { setMode } from "@redux/features/modeSlice";
import { useDispatch } from "react-redux";
import { Navbar } from "@components/index";

function Header() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktopMatches = useMediaQuery(theme.breakpoints.up("sm"));

  const handleTheme = () => {
    dispatch(setMode(theme.palette.mode == "dark" ? "light" : "dark"));
  };

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: theme.spacing(1.5),
    paddingBottom: isDesktopMatches ? 0 : theme.spacing(1),
    "@media all": {
      minHeight: "min-content",
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 1 }} enableColorOnDark>
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
              <Typography variant="h5">WhatsMe</Typography>
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
    </Box>
  );
}

export default Header;

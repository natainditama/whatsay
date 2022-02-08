import {
  Box,
  Tabs,
  Tab,
  Stack,
  useTheme,
  useMediaQuery,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faHistory, faUsers } from "@fortawesome/free-solid-svg-icons";

const NavList = [
  {
    name: "Home",
    path: "/",
    icon: faHome,
  },
  {
    name: "History",
    path: "/history",
    icon: faHistory,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: faUsers,
  },
];

function Navbar() {
  const theme = useTheme();
  const isDesktopMatches = useMediaQuery(theme.breakpoints.up("sm"));
  const router = useRouter();

  const handleChange = (_, newValue) => {
    router.push(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isDesktopMatches ? (
        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Tabs
            value={router.pathname}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {NavList.map((item, index) => {
              return (
                <Tab
                  value={item?.path}
                  label={<Typography>{item?.name}</Typography>}
                  key={index}
                  disableTouchRipple
                  disableRipple
                  icon={<FontAwesomeIcon icon={item?.icon} size="lg" />}
                  iconPosition="start"
                />
              );
            })}
          </Tabs>
        </Stack>
      ) : (
        <Box
          sx={{
            position: "fixed",
            inset: "0",
            top: "auto",
            zIndex: "99999999999",
          }}
        >
          <BottomNavigation
            showLabels
            value={router.pathname}
            onChange={handleChange}
          >
            {NavList.map((item, index) => {
              return (
                <BottomNavigationAction
                  label={<Typography>{item?.name}</Typography>}
                  value={item?.path}
                  key={index}
                  icon={<FontAwesomeIcon icon={item?.icon} size="lg" />}
                />
              );
            })}
          </BottomNavigation>
        </Box>
      )}
    </Box>
  );
}

export default Navbar;

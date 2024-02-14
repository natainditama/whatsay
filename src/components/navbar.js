import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import { navList } from "@/utils/consts";
import { useRouter } from "next/router";

export function Navbar() {
  const router = useRouter();

  const handleChange = (_, newValue) => {
    router.push(newValue);
  };

  return (
    <>
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
          {navList.map((item, index) => {
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
    </>
  );
}

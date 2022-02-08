import { Metadata } from "@components/index";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  TextField,
  Typography,
  Button,
  Stack,
  Grid,
  InputAdornment,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addHistories } from "@redux/features/historySlice";

export default function Home({ countries }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const countryList = useMemo(() => countries, []);
  const [error, setError] = useState({});

  const [temp, setTemp] = useState({
    telphone: "",
    messages: "",
    isLoading: false,
  });

  const handleChange = ({ target }) => {
    setTemp({ ...temp, [target.id]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!temp.telphone) {
      setError({ ...error, telphone: "This field is required" });
      return;
    }
    if (!temp.messages) {
      setError({ ...error, messages: "This field is required" });
      return;
    }
    setTemp({
      ...temp,
      isLoading: true,
    });
    setTimeout(() => {
      dispatch(addHistories({ ...temp, createAt: new Date() }));
      if (typeof window != undefined) {
        window.open(
          `https://api.whatsapp.com/send?phone=${
            temp.telphone
          }&text=${temp.messages.split("\n").join("%0a")}&source=&data`,
          "_blank"
        );
        setTemp({ telphone: "", messages: "", isLoading: false });
        setError({});
      }
    }, 2000);
  };

  return (
    <Box>
      <Metadata />
      <Box
        component={`form`}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography>
              Using Personal Messages you can send message to unsaved phone
              number.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <TextField
                  id="telphone"
                  name="telphone"
                  error={Boolean(error.telphone)}
                  helperText={error.telphone}
                  onChange={handleChange}
                  fullWidth
                  value={temp.telphone}
                  required
                  label="Phone Number"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FontAwesomeIcon icon={faPhone} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl
                  variant="outlined"
                  error={Boolean(error.iso)}
                  fullWidth
                >
                  <InputLabel id="iso">Country</InputLabel>
                  <Select
                    labelId="iso"
                    id="iso"
                    inputProps={{
                      required: true,
                    }}
                    value={temp.iso ?? ""}
                    onChange={handleChange}
                    label="Country"
                  >
                    <MenuItem value="" disabled>
                      <em>None</em>
                    </MenuItem>
                    {countryList.map((data, index) => {
                      return (
                        <MenuItem value={data.alpha2Code} key={index}>
                          <Box sx={{ display: "flex" }}>
                            <Image
                              src={data?.flags.svg}
                              height="20"
                              width="30"
                            />
                            <Typography ml={1}>{data?.name}</Typography>
                          </Box>
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <FormHelperText>{error.iso}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="messages"
              name="messages"
              fullWidth
              required
              error={Boolean(error.messages)}
              helperText={error.messages}
              multiline
              value={temp.messages}
              onChange={handleChange}
              minRows={4}
              maxRows={8}
              label="Message"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={temp.isLoading}
              startIcon={temp.isLoading && <CircularProgress size={20} />}
              fullWidth
              disableElevation
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://restcountries.com/v2/all`);
    const countries = await res.json();
    return { props: { countries } };
  } catch (error) {
    console.log(error);
    return { props: { countries: [] } };
  }
}

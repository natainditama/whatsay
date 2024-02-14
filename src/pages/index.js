import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { parsePhoneNumber } from "libphonenumber-js";
import { addHistories } from "@/redux/slices";
import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home({ countries }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const countryList = useMemo(() => countries, [countries]);

  const [error, setError] = useState({
    telphone: "",
    iso: "",
    messages: "",
  });

  const [temp, setTemp] = useState({
    telphone: "",
    messages: "",
    iso: "",
    isLoading: false,
  });

  const handleChange = ({ target }) => {
    setTemp({ ...temp, [target?.id ?? "iso"]: target.value });
  };

  const validatePhone = () => {
    if (!router.query.to) {
      try {
        const parsed = parsePhoneNumber(temp.telphone, temp.iso);
        if (!parsed.isValid()) {
          setError({
            ...error,
            telphone: "This phone number is invalid",
          });
          return false;
        } else {
          setError({
            ...error,
            telphone: "",
          });
          return true;
        }
      } catch (err) {
        const text = err.message.toString().toLowerCase().split("_");
        const message = text.join(" ");
        setError({
          ...error,
          telphone: `This phone number is ${message}`,
        });
        return false;
      }
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationPhone = validatePhone();
    if (validationPhone) {
      setTemp({
        ...temp,
        isLoading: true,
      });
      setTimeout(() => {
        if (typeof window != undefined) {
          const phone =
            router.query?.to ??
            parsePhoneNumber(temp.telphone, temp.iso).formatInternational();
          console.log(phone);
          dispatch(
            addHistories({
              ...temp,
              createAt: `${new Date()}`,
              telphone: phone,
            }),
          );
          window.open(
            `https://api.whatsapp.com/send?phone=${phone}&text=${temp.messages
              .split("\n")
              .join("%0a")}&source=&data`,
            "_blank",
          );
          setTemp({ telphone: "", messages: "", isLoading: false });
          setError({});
        }
      }, 2000);
    }
  };

  return (
    <Box>
      <Box component={`form`} autoComplete="off" onSubmit={handleSubmit}>
        <Grid container rowSpacing={2}>
          <Grid item xs={12}>
            <Typography>
              Using Personal Messages you can send message to unsaved phone
              number.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!router.query.to && (
              <Grid container spacing={2}>
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
                                alt={`flage ${data?.name}`}
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
              </Grid>
            )}
            {router.query.to && (
              <Typography variant="subtitle1">
                to : <b>{decodeURI(router.query.to)}</b>
              </Typography>
            )}
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

export async function getStaticProps() {
  try {
    const res = await fetch(`https://restcountries.com/v2/all`);
    const countries = await res.json();
    return { props: { countries } };
  } catch (error) {
    console.log(error);
    return { props: { countries: [] } };
  }
}

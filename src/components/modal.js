import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addContact, editContact } from "@/redux/slices";

export function Modal({ open, setOpen, data, countries }) {
  const dispatch = useDispatch();
  const [temp, setTemp] = useState({ name: "", iso: "", telp: "" });
  const [error, setError] = useState({ name: "", iso: "", telp: "" });
  const countryList = useMemo(() => countries, [countries]);
  const handleChange = ({ target }) => {
    setTemp({ ...temp, [target?.id ?? "iso"]: target.value });
  };

  const handleClose = () => {
    setOpen(false);
    if (data?.type == "add") {
      setTemp({
        name: "",
        iso: "",
        telp: "",
      });
    }
  };

  useEffect(() => {
    if (data?.type == "edit") {
      setTemp({
        name: data?.name,
        telp: data?.telp,
        iso: data?.iso,
      });
    }
  }, [data?.type, data?.name, data?.telp, data?.iso]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      let phone, isoCountry;
      if (data?.type == "add") {
        phone = temp.telp;
        isoCountry = temp.iso;
      } else {
        phone = data?.telp;
        isoCountry = data?.iso;
      }
      const parsed = parsePhoneNumber(phone, isoCountry);
      if (!parsed.isValid()) {
        setError({
          ...error,
          telp: "This phone number is invalid",
        });
        return;
      } else {
        setError({
          ...error,
          telp: "",
        });
      }
    } catch (err) {
      const text = err.message.toString().toLowerCase().split("_");
      const message = text.join(" ");
      setError({
        ...error,
        telp: `This phone number is ${message}`,
      });
      return;
    }

    switch (data?.type) {
      case "add":
        setTemp({ ...temp, id: uuidv4() });
        dispatch(addContact(temp));
        handleClose();
        break;
      case "edit":
        setTemp({ ...temp });
        dispatch(editContact({ id: data?.id, data: temp }));
        handleClose();
        break;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>{data?.title}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} onReset={handleClose}>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Name"
            defaultValue={data?.name}
            type="text"
            fullWidth
            required
            error={Boolean(error.name)}
            helperText={error.name}
            sx={{ mb: 2 }}
            autoComplete="off"
            variant="outlined"
            onChange={handleChange}
          />
          {data.type == "add" && (
            <FormControl
              variant="outlined"
              sx={{ width: 1 }}
              error={Boolean(error.iso)}
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
                          alt="flag of country"
                        />
                        <Typography ml={1}>{data?.name}</Typography>
                      </Box>
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{error.iso}</FormHelperText>
            </FormControl>
          )}
          <TextField
            id="telp"
            name="telp"
            sx={{ mt: 2 }}
            label="Telphone"
            type="tel"
            fullWidth
            required
            autoComplete="off"
            error={Boolean(error.telp)}
            helperText={error.telp}
            defaultValue={data?.telp}
            onChange={handleChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button type="reset">Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default Modal;

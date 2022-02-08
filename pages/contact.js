import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen, faUser } from "@fortawesome/free-solid-svg-icons";
import { deleteContact, getAllContact } from "@redux/features/contactSlice";
import {
  Box,
  Stack,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  IconButton,
  ListItemText,
} from "@mui/material";
import { Modal, Metadata } from "@components/index";
import { parsePhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/router";

export default function Contacts({ countries }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [dataModal, setDataModal] = useState({});
  const [open, setOpen] = useState(false);
  const contactList = useSelector(({ contact }) => contact.contacts);

  useEffect(() => {
    dispatch(getAllContact());
  }, [dispatch]);

  return (
    <Box>
      <Metadata title="Contact" />
      <Modal
        open={open}
        setOpen={setOpen}
        data={dataModal}
        countries={countries}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: 2 }}
      >
        <Typography color="primary" variant="h5">
          My Contacts
          <Typography color="text.primary" variant="body2">
            List your contacts here
          </Typography>
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
            setDataModal({
              title: "Add Contact",
              type: "add",
            });
          }}
        >
          Add New Contact
        </Button>
      </Stack>

      {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="primary" variant="h5"></Typography>
        <Button
          variant="outlined"
          onClick={() => {
            setOpen(true);
            setDataModal({
              title: "Add Contact",
              type: "add",
            });
          }}
        >
          Add New Contact
        </Button>
      </Stack> */}
      <List>
        {!contactList.length && (
          <Typography pt={12} align="center" color="info">
            You don{"'"}t have any contact yet{"."}
          </Typography>
        )}
        {contactList.map((data, index) => {
          return (
            <ListItem
              key={index}
              secondaryAction={
                <Box>
                  <IconButton
                    aria-label="delete"
                    onClick={() => dispatch(deleteContact(data.id))}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="xs" />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    sx={{ ml: 1, mr: 1 }}
                    onClick={() => {
                      setOpen(true);
                      setDataModal({
                        title: "Edit Contact",
                        id: data.id,
                        iso: data.iso,
                        name: data.name,
                        telp: data.telp,
                        type: "edit",
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} size="xs" />
                  </IconButton>
                  <IconButton
                    aria-label="chat"
                    color="primary"
                    onClick={() => {
                      router.push({
                        pathname: "/",
                        query: {
                          to: encodeURI(
                            parsePhoneNumber(
                              data.telp,
                              data.iso
                            ).formatInternational()
                          ),
                        },
                      });
                    }}
                  >
                    <i className="fab fa-whatsapp"></i>
                  </IconButton>
                </Box>
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <FontAwesomeIcon icon={faUser} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={data?.name}
                secondary={parsePhoneNumber(
                  data?.telp,
                  data?.iso
                ).formatInternational()}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`https://restcountries.com/v2/all`);
    const countries = await res.json();
    return {
      props: { countries },
    };
  } catch (error) {
    console.log(error);
    return { props: { countries: [] } };
  }
}

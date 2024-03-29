import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { faPen, faTrashAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { deleteContact, getAllContact } from "@/redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { parsePhoneNumber } from "libphonenumber-js";
import { useEffect, useState } from "react";
import { Modal } from "@/components/index";
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
    <>
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
        <div>
          <Typography color="primary" variant="h6" fontWeight={"500"} mb={0.2}>
            My Contacts
          </Typography>
          <Typography color="text.secondary" variant="body2">
            List your contacts here
          </Typography>
        </div>
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
          Create contact
        </Button>
      </Stack>
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
                <>
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
                              data.iso,
                            ).formatInternational(),
                          ),
                        },
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </IconButton>
                </>
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
                  data?.iso,
                ).formatInternational()}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export async function getStaticProps() {
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

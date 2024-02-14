import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { fetchHistories, resetHistories } from "@/redux/slices";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Confirm } from "@/components/index";
import { useRouter } from "next/router";

const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} {...props} />
))(() => ({
  background: "transparent",
  "&:before": {
    display: "none",
  },
}));

export default function History() {
  const router = useRouter();
  const dispatch = useDispatch();
  const historyList = useSelector(({ history }) => history.histories);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    dispatch(fetchHistories());
    if (agree) {
      dispatch(resetHistories());
    }
  }, [dispatch, agree]);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Confirm
        open={open}
        setOpen={setOpen}
        setAgree={setAgree}
        data={{
          title: "Are you sure want to delete all of your history?",
          text: "You can't undo this action. All of your history will be deleted. Are you sure?",
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pt: 2, pb: 4 }}
      >
        <div>
          <Typography color="primary" variant="h6" fontWeight={"500"} mb={0.2}>
            My History
          </Typography>
          <Typography color="text.secondary" variant="body2">
            List your recent chat history
          </Typography>
        </div>
        <Button
          color="error"
          disabled={historyList.length === 0}
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete histories
        </Button>
      </Stack>
      {historyList.length === 0 && (
        <Typography pt={12} align="center" color="info">
          You don{"'"}t have any history yet{"."}
        </Typography>
      )}
      {historyList.map((list, index) => {
        return (
          <Fragment key={index}>
            <StyledAccordion
              disableGutters
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                sx={{ pl: 0 }}
                expandIcon={<FontAwesomeIcon icon={faChevronDown} />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <ListItem
                  sx={{ p: 0 }}
                  secondaryAction={
                    <IconButton
                      color="primary"
                      size="large"
                      onClick={() =>
                        router.push({
                          pathname: "/",
                          query: { to: list.telphone },
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faWhatsapp} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={decodeURI(list.telphone)}
                    secondary={
                      <Typography
                        noWrap
                        color="text.secondary"
                        mr={2}
                        variant="caption"
                      >
                        {new Date(list.createAt).toDateString()} -
                        {new Date(list.createAt).toTimeString().substr(0, 5)}
                      </Typography>
                    }
                  />
                </ListItem>
              </AccordionSummary>
              <AccordionDetails sx={{ pl: 0 }}>
                <Typography>{list?.messages}</Typography>
              </AccordionDetails>
            </StyledAccordion>
            <Divider />
          </Fragment>
        );
      })}
    </>
  );
}

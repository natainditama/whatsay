import { Metadata, Confirm } from "@components/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Stack,
  Button,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { fetchHistories, resetHistories } from "@redux/features/historySlice";

const StyledAccordion = styled((props) => (
  <Accordion disableGutters elevation={0} {...props} />
))(() => ({
  background: "transparent",
  "&:before": {
    display: "none",
  },
}));

function History() {
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
    <Box>
      <Metadata title={"History"} />
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
        <Typography color="primary" variant="h5">
          My History
          <Typography color="text.primary" variant="body2">
            List your recent chat history
          </Typography>
        </Typography>
        <Button
          color="error"
          disabled={historyList.length === 0}
          onClick={() => {
            setOpen(true);
          }}
        >
          Delete Histories
        </Button>
      </Stack>
      {historyList.length === 0 && (
        <Typography pt={12} align="center" color="info">
          You don't have any history yet.
        </Typography>
      )}
      {historyList.map((list, index) => {
        return (
          <Box key={index}>
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
                      <i className="fab fa-whatsapp"></i>
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={list.telphone}
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
          </Box>
        );
      })}
    </Box>
  );
}

export default History;

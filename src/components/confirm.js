import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export function Confirm({ open, setOpen, setAgree, data }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setAgree(false);
    handleClose();
  };

  const handleAllow = () => {
    setAgree(true);
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>{data?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{data?.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllow} color="error">
            Ok
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

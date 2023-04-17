import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Account } from "./dashboard";
import env from "react-dotenv";

interface accountDetailsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  account: Account;
  setaccount: (account: Account) => void;
}

const accountDetails = (props: accountDetailsProps) => {
  const { open, setOpen, account, setaccount } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    fetch(env.API_URL + "/updateaccount", {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${document.cookie}`],
      ],
      body: JSON.stringify({
        Guid: account.Guid,
        Username: account.Username,
        Email: account.Email,
        Website: account.Website,
        Password: account.Password,
      }),
    });
    setOpen(false);
    location.reload();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="accountDetails">Account Details</DialogTitle>
      <DialogContent id="accountDetails">
        <TextField
          autoFocus
          margin="dense"
          id="accountDetailsTextBox"
          label="Email Address"
          onChange={(e) => {
            setaccount({ ...account, Email: e.target.value });
          }}
          type="email"
          fullWidth
          variant="outlined"
          value={account.Email}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Website"
          type="Website"
          fullWidth
          onChange={(e) => {
            setaccount({ ...account, Website: e.target.value });
          }}
          variant="outlined"
          value={account.Website}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Username"
          type="username"
          fullWidth
          onChange={(e) => {
            setaccount({ ...account, Username: e.target.value });
          }}
          variant="outlined"
          value={account.Username}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="name"
          fullWidth
          onChange={(e) => {
            setaccount({ ...account, Password: e.target.value });
          }}
          variant="outlined"
          value={account.Password}
        />
      </DialogContent>
      <DialogActions id="accountDetails">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default accountDetails;

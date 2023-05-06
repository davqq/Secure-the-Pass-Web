import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Account } from "./dashboard";
import env from "react-dotenv";
import getCookie from "../helper/getCookie";

interface accountDetailsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  account: Account;
  setaccount: (account: Account) => void;
}

const accountDetails = (props: accountDetailsProps) => {
  const { open, setOpen, account, setaccount } = props;

  const handleDelete = () => {
    fetch(env.API_URL + "/deleteaccount", {
      method: "DELETE",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${getCookie("jwt")}`],
      ],
      body: JSON.stringify({
        Guid: account.Guid,
      }),
    });
    handleClose();
    location.reload();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    fetch(env.API_URL + "/updateaccount", {
      method: "PUT",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${getCookie("jwt")}`],
      ],
      body: JSON.stringify({
        Guid: account.Guid,
        Username: account.Username,
        Email: account.Email,
        Website: account.Website,
        Password: account.Password,
      }),
    });
    handleClose();
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
          margin="dense"
          id="accountDetailsTextBox"
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
          margin="dense"
          id="accountDetailsTextBox"
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
          margin="dense"
          id="accountDetailsTextBox"
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
        <Button color="error"  onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default accountDetails;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Account } from "./dashboard";
import env from "react-dotenv";
import SyncIcon from "@mui/icons-material/Sync";

interface createAccountProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const createAccount = (props: createAccountProps) => {
  const { open, setOpen } = props;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const clearStates = () => {
    setUsername("");
    setEmail("");
    setWebsite("");
    setPassword("");
  };

  const handleClose = () => {
    setOpen(false);
    clearStates();
  };

  const handleAdd = () => {
    fetch(env.API_URL + "/createaccount", {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${document.cookie}`],
      ],
      body: JSON.stringify({
        Username: username,
        Email: email,
        Website: website,
        Password: password,
      }),
    });
    setOpen(false);
    clearStates();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">New Account</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          fullWidth
          variant="outlined"
          value={email}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Website"
          type="Website"
          fullWidth
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          variant="outlined"
          value={website}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Username"
          type="username"
          fullWidth
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          variant="outlined"
          value={username}
        />
        <TextField
          autoFocus
          margin="dense"
          id="text"
          label="Password"
          type="name"
          fullWidth
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="outlined"
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="generate password">
                  <IconButton
                    aria-label="sync passwords"
                    onClick={() => {
                      fetch(env.API_URL + "/generatepassword", {
                        method: "GET",
                        headers: [
                          ["Content-Type", "application/json"],
                          ["Authorization", `${document.cookie}`],
                        ],
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          setPassword(data.password);
                        });
                    }}
                  >
                    <SyncIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default createAccount;

import {
  Autocomplete,
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
import { useEffect, useState } from "react";
import { Account } from "./dashboard";
import env from "react-dotenv";
import SyncIcon from "@mui/icons-material/Sync";

interface createAccountProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface Company {
  url: string;
  name: string;
}

const createAccount = (props: createAccountProps) => {
  const { open, setOpen } = props;
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch(env.API_URL + "/getcompanies", {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${document.cookie}`],
      ],
    })
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
      });
  }, []);

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
      <DialogTitle id="accountDetails">New Account</DialogTitle>
      <DialogContent id="accountDetails">
        <Autocomplete
          freeSolo
          options={companies.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Website"
              id="accountDetailsTextBox"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              fullWidth
              variant="outlined"
              value={email}
            />
          )}
        />

        <TextField
          margin="dense"
          id="accountDetailsTextBox"
          label="Email Address"
          fullWidth
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          variant="outlined"
          value={website}
        />
        <TextField
          margin="dense"
          id="accountDetailsTextBox"
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
          margin="dense"
          id="accountDetailsTextBox"
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
                    <SyncIcon id="Syncicon" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions id="accountDetails">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default createAccount;

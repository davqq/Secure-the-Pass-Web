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
import getCookie from "../helper/getCookie";

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
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [website, setWebsite] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch(env.API_URL + "/getcompanies", {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${getCookie("jwt")}`],
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
        ["Authorization", `${getCookie("jwt")}`],
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
    location.reload();
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
          onChange={(event, newValue) => {
            setWebsite(newValue || "");
          }}
          options={companies.map((option) => `${option.name} | ${option.url}`)}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="dense"
              label="Website"
              id="accountDetailsTextBox"
              type="Webiste"
              fullWidth
              variant="outlined"
              value={website}
            />
          )}
        />

        <TextField
          margin="dense"
          id="accountDetailsTextBox"
          label="Email Address"
          type="Email"
          fullWidth
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          variant="outlined"
          value={email}
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
                          ["Authorization", `${getCookie("jwt")}`],
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

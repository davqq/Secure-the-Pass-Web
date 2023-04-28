import { useState, useEffect, useRef } from "react";
import env from "react-dotenv";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import "./home.css";
import CreateAccount from "./createAccount";
import AccountDetails from "./accountDetails";
import { useSearchParams } from "react-router-dom";

export interface Account {
  Guid?: string;
  Username?: string;
  Email?: string;
  Password?: string;
  Website?: string;
  UserGuid?: string;
}

function Dashboard() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [account, setAccount] = useState<Account>({});
  const [openNew, setOpenNew] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const controllerRef = useRef<AbortController | null>();

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    fetch(`${env.API_URL}/getaccounts/${searchParams.get("q") || ""}`, {
      method: "GET",
      signal: controllerRef.current?.signal,
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${document.cookie}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setAccounts(result);
        setLoading(false);
        controllerRef.current = null;
      });
  }, [searchParams]);

  if (loading) {
    return (
      <section className="home">
        <div className="text">Dashboard Sidebar</div>
        <div className="loader">
          <CircularProgress />
        </div>
      </section>
    );
  }

  return (
    <section className="home">
      <div className="text">Dashboard Sidebar</div>
      <div className="wrapper">
        <Grid container alignItems="flex-start">
          {accounts.map((account) => {
            return (
              <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
                <Card
                  key={account.Guid}
                  style={{
                    margin: 10,
                  }}
                  className="card"
                >
                  <CardActionArea
                    style={{ height: 150 }}
                    onClick={() => {
                      setAccount(account);
                      setOpenDetails(true);
                    }}
                  >
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                          wordBreak: "break-word",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {account.Website}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          wordBreak: "break-word",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        className="subtitle"
                      >
                        {account.Username}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                          wordBreak: "break-word",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                        className="subtitle"
                      >
                        {account.Email}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <IconButton
          id="addButton"
          onClick={() => {
            setOpenNew(true);
          }}
        >
          +
        </IconButton>
      </div>
      <CreateAccount open={openNew} setOpen={setOpenNew} />
      <AccountDetails
        open={openDetails}
        setOpen={setOpenDetails}
        account={account}
        setaccount={setAccount}
      />
    </section>
  );
}

export default Dashboard;

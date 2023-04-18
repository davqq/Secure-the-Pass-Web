import { useState, useEffect } from "react";
import env from "react-dotenv";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, IconButton } from "@mui/material";
import "./home.css";
import CreateAccount from "./createAccount";
import AccountDetails from "./accountDetails";

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
  useEffect(() => {
    fetch(`${env.API_URL}/getaccounts`, {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${document.cookie}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setAccounts(result);
      });
  }, []);

  return (
    <section className="home">
      <div className="text">Dashboard Sidebar</div>
      <div className="wrapper">
        <div
          style={{
            justifyContent: "center",
          }}
        >
          <Grid container alignItems="flex-start">
            {accounts.map((account) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Card
                    key={account.Guid}
                    style={{ margin: 10 }}
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
                          style={{ wordBreak: "break-word" }}
                        >
                          {account.Website}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ wordBreak: "break-word" }}
                          className="subtitle"
                        >
                          {account.Username}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ wordBreak: "break-word" }}
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
        </div>
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

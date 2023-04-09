import { useState, useEffect } from "react";
import env from "react-dotenv";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Password: string;
  Website: string;
  UserGuid: string;
}

function Dashboard() {
  const [accounts, setAccounts] = useState<Account[]>([]);

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
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {accounts.map((account) => {
            return (
              <Card
                sx={{ maxWidth: 345 }}
                key={account.Guid}
                style={{ margin: 10 }}
              >
                <CardActionArea>
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
                    >
                      {account.Username}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ wordBreak: "break-word" }}
                    >
                      {account.Password}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;

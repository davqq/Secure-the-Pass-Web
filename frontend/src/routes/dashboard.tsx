import React, { useState, useEffect } from "react";
import env from "react-dotenv";

export interface Account {
  Guid: string;
  Username: string;
  Email: string;
  Password: string;
  Website: string;
  UserGuid: string;
}

function Dashboard() {
  const [items, setItems] = useState<Account[]>([]);

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
        setItems(result);
      });
  }, []);

  return (
    <div className="home">
      <section className="home">
        <div className="text">Dashboard Sidebar</div>
        <div className="wrapper">
          <ul>
            {items.map((item) => (
              <li key={item.Guid}>{item.Username}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

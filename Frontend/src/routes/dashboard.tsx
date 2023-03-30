import React, { useState, useEffect } from "react";

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
    fetch("http://localhost:3001/api/getaccounts", {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `${localStorage.getItem("token")}`],
      ],
    })
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  return (
    <section className="home">
      <div className="text">Dashboard Sidebar</div>
      <div className="wrapper">
        <ul>
          {items.map((item) => (
            <li key={item.Guid}>
              {item.Username} 
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;

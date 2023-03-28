import React, { useState, useEffect } from "react";

interface User {
  Guid: string;
  name: string;
  email: string;
  password: string;
}

function Dashboard() {
  const [items, setItems] = useState<User[]>([]);

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
              {item.name} {item.email} {item.password}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Dashboard;

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);


  
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'david' })
  };

  React.useEffect(() => { 
    fetch("/login", requestOptions)  
      .then((res) => res.json()) 
      .then((data) => setData(data));
  }, []);

  document.cookie = `token=${data}`
  // console.log(data)

  const requestOptionsGet = {
    method: 'GET',
    headers: { 'authorization': document.cookie },
  };

    React.useEffect(() => { 
      fetch("/users", requestOptionsGet)  
        .then((res) => res.json()) 
        .then((data) => setData(data));
    }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data || !data.users ? "Loading..." : data.users}</p>
      </header>
    </div>
  );
}

export default App;
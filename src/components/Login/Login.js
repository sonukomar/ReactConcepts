import "../../App.css";
import "./Login.css";
import { useState } from "react";
import { FetchCall } from "../../apis/FetchCall";

const Login = ({ data, onLogin }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [name, setName] = useState({});

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login request and update the state accordingly
  const loginUser = (e) => {
    if (userName === "" || password === "") {
      setName("Please Enter values");
    } else {
      FetchCall("POST", "http://localhost:3030/login", {
        username: userName,
        password: password,
      })
        .then((data) => {
          setLoggedIn(true);
          setName(data.firstname);
          onLogin(true, data);
          sessionStorage.setItem("token", data.token);
        })
        .catch((err) => {
          setName("Invalid Credentails!!");
        });
    }
  };

  const updateName = (e) => {
    setUserName(e.target.value);
  };

  const updatePass = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className="login-main">
      <div className="login-screen">
        {!loggedIn && (
          <div className="login">
            <h3>Please Login</h3>

            <input
              type="text"
              onChange={updateName}
              placeholder="Name"
              value={userName}
              required
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={updatePass}
              required
            />
            <br />
            <br />
            {name === "Invalid User" && <span className="error">{name}</span>}
            <br />

            <button onClick={loginUser}>Login ✔️</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

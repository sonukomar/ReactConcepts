import "./App.css";
import { useEffect, Suspense, useState, lazy } from "react";
import { FetchCall } from "./apis/FetchCall";
import useUserDetails from "./customHooks/useUserDetails";
import LoginContext from "./contexts/LoginContext";
import Header from "./components/Header/Header";

function App() {
  const data = useUserDetails();
  const [facts, setFacts] = useState("null");
  const [loggedIn, setLoggedIn] = useState({
    isLoggedIn: false,
    user: {},
  });

  // Importing components when it is required
  const Welcome = lazy(() => import("./components/Welcome/Welcome"));
  const Login = lazy(() => import("./components/Login/Login"));
  const Loading = () => {
    return <h1>Loading...</h1>;
  };

  const validateUserSession = () => {
    const token = sessionStorage.getItem("token");
    debugger;
    if (token) {
      FetchCall("GET", "http://localhost:3030/verifyToken", {}, token).then(
        (data) => {
          if (data.success) {
            setLoggedIn({
              isLoggedIn: true,
              user: loggedIn.user,
            });
          } else {
            setLoggedIn({
              isLoggedIn: false,
              user: loggedIn.user,
            });
          }
        }
      );
    }
  };
  const setLoginStatus = (isLoggedIn, user) => {
    debugger;
    setLoggedIn({
      isLoggedIn: isLoggedIn,
      user: user?.user,
    });
  };
  useEffect(() => {
    validateUserSession();

    const events = new EventSource("http://localhost:3030/events");

    events.onmessage = (event) => {
      setFacts(JSON.parse(event.data));
    };
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <LoginContext.Provider
          value={{ isLoggedIn: loggedIn, user: loggedIn.user }}
        >
          <Header />
          {!loggedIn.isLoggedIn && (
            <Login data={data} onLogin={setLoginStatus} />
          )}
          {loggedIn.isLoggedIn && <Welcome />}
        </LoginContext.Provider>
      </Suspense>
      {facts && facts?.email && (
        <div className="notification">
          <h3>New Email 📨</h3>
          <hr />
          <p>Sender: {facts.sender}</p>
          <p>Email: {facts.email}</p>
          <p>Subject: {facts.subject}</p>
        </div>
      )}
    </div>
  );
}

export default App;

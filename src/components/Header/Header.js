import "./Header.css";
import { useContext } from "react";
import LoginContext from "../../contexts/LoginContext";

const Header = () => {
  const { isLoggedIn, user } = useContext(LoginContext);
  return (
    <div className="header">
      <div className="half">
        <h2>📚 Readers Paradise 📚</h2>
      </div>
      <div className="half">
        {isLoggedIn?.isLoggedIn
          ? `Welcome ${user?.firstName?.toLocaleUpperCase()}`
          : ""}
      </div>
      <div className="half"></div>
      <div className="half">
        <a href="#">{isLoggedIn?.isLoggedIn ? "Logout ❌" : "Login 🖥️"}</a>
      </div>
    </div>
  );
};

export default Header;

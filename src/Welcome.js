import "./App.css";
import { useContext, useEffect, useState } from "react";
import Books from "./Books";
import { FetchCall } from "./FetchCall";
import LoginContext from "./LoginContext";

const list = [
  "Harry Potter and the Philosopher",
  "sonu kumar is",
  "loli kimar",
  "kumar ram",
  "raja ji",
  "rjia",
  "sexy ram",
];

const Welcome = () => {
  const [searchR, setSearchedResult] = useState("");
  const [timer, setTimer] = useState(null);
  const [books, setBooks] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const { isLoggedIn, user } = useContext(LoginContext);

  useEffect(() => {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }, []);

  const getBooks = () => {
    const token = sessionStorage.getItem("token");
    FetchCall("GET", "http://localhost:3030/books", {}, token).then((data) => {
      if (data.error) {
        alert("Token Expired, Login Again");
        setLoggedIn(false);
      } else setBooks(data.booklist);
    });
  };
  const handleSearch = (e) => {
    const searchValue = e.target.value;

    if (timer === null) {
      // fetch(`http://localhost:3030/users?name=${searchValue}`)
      //   .then((data) => data.json())
      //   .then((data) => console.log(data));
      const searchedR = list.filter((name) => name.includes(searchValue));
      setSearchedResult(searchedR.length > 0 ? searchedR : []);

      let timeri = setTimeout(() => {
        setTimer(null);
      }, 5000);
      setTimer(timeri);
    }
  };
  return (
    <div className="container">
      <div className="col-md-2 side-bar">
        <h2>Filters</h2>
        <hr />
        <h3>Categories</h3>
        <button class="accordion">Electronics</button>
        <div class="panel">
          <p>Lorem ipsum...</p>
        </div>
        <button class="accordion">Home Decor</button>
        <div class="panel">
          <p>Lorem ipsum...</p>
        </div>
        <button class="accordion">Kitchen</button>
        <div class="panel">
          <p>Lorem ipsum...</p>
        </div>

        <hr />

        <h3>Price:</h3>
        <br />
        <input type="range" id="temp" name="temp" list="markers" />

        <datalist id="markers">
          <option value="0">0</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
          <option value="100">100</option>
        </datalist>

        <hr />
        <h3>Brands</h3>
        <div className="check">
          <input type="checkbox" className="brand" />
          <span>Apple</span>
        </div>
        <div className="check">
          <input type="checkbox" className="brand" />
          <span>Apple</span>
        </div>
        <div className="check">
          <input type="checkbox" className="brand" />
          <span>Apple</span>
        </div>
        <div className="check">
          <input type="checkbox" className="brand" />
          <span>Apple</span>
        </div>
      </div>

      <div className="col-md-8">
        <h2>
          Welcome {user?.firstName?.toLocaleUpperCase()}, your email is{" "}
          {user.email}
        </h2>
        <h4>{`Dear ${user?.firstName?.toLocaleUpperCase()}, you are ${
          user.age
        } old and you have "${user.role}" role access.`}</h4>
        <p>You can Search books:</p>
        <input
          type="text"
          placeholder="Enter book name"
          onChange={handleSearch}
        />
        <button onClick={getBooks}>Read Books</button>
        {searchR.length > 0 && (
          <ul>
            {searchR.length > 0 &&
              searchR.map((book) => {
                return <li>{book}</li>;
              })}
          </ul>
        )}
        <br />
        {books.length > 0 && (
          <div className="col-md-8">
            {books &&
              books.length > 0 &&
              books.map((book) => {
                return <Books books={book}></Books>;
              })}
          </div>
        )}
      </div>
    </div>
  );
};
export default Welcome;

import React, { useContext, useState } from "react";
import { GeneralContext } from "../App/App";
import "./Authorization.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const { setUser, snackbar, setIsLoader } = useContext(GeneralContext);

  const handleInput = (ev) => {
    const { name, value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = (ev) => {
    ev.preventDefault();

    if (!formData.userName) {
      snackbar("Username is missing");
      return;
    }

    if (!formData.password) {
      snackbar("You can't log in without a password");
      return;
    }

    setIsLoader(true);

    fetch(`https://api.shipap.co.il/login`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((x) => {
            throw new Error(x);
          });
        }
      })
      .then((data) => {
        setUser(data);
        snackbar("user logged in");
      })
      .catch((err) => {
        snackbar(err.message);
      })
      .finally(() => setIsLoader(false));
  };

  return (
    <>
      <div className="Login smallFrame">
        <h2>Login</h2>

        <form onSubmit={login}>
          <label>
            Username:
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleInput}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInput}
            />
          </label>
          <div className="center">
            <button>Login</button>
          </div>
        </form>

        <p className="signup">
          <Link to="/signup">Click here to log in</Link>
        </p>
      </div>
    </>
  );
};

export default Login;

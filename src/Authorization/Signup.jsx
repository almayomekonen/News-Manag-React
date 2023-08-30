import React, { useContext, useState } from "react";
import { GeneralContext } from "../App/App";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
  });

  const { snackbar, setIsLoader } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleInput = (ev) => {
    const { name, value } = ev.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const signup = (ev) => {
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

    fetch(`https://api.shipap.co.il/signup`, {
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
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        snackbar(err.message);
      })
      .finally(() => setIsLoader(false));
  };

  return (
    <>
      <div className="Login smallFrame">
        <h2>Create an Account</h2>

        <form onSubmit={signup}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInput}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
            />
          </label>

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

          <button>Sign Up</button>
        </form>
      </div>

      <p className="signup">
        <Link to="/">Click here to log in</Link>
      </p>
    </>
  );
};

export default Signup;

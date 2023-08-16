import { useState } from "react";
import instance from "../api/axios.js";

const SignUp = () => {
  const [state, setState] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { fname, lname, email, password } = state;
      instance
        .post("/signup", {
          fname,
          lname,
          email,
          password,
        })
        .then((response) => console.log(response));
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  const handleChange = (e) => {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="First Name"
          value={state.fname}
          onChange={handleChange}
        />
        <input
          type="text"
          id="lname"
          name="lname"
          placeholder="Last Name"
          value={state.lname}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

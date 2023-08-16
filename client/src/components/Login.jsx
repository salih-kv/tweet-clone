import { useState } from "react";
import instance from "../api/axios.js";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      instance.post("/login", state).then((response) => console.log(response));
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign in to your Account</h2>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

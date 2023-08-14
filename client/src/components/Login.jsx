const Login = () => {
  return (
    <div>
      <form>
        <h2>Sign in to your Account</h2>
        <input type="email" id="email" name="email" placeholder="Email" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

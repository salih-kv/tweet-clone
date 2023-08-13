const Form = () => {
  return (
    <div>
      <form>
        <h2>Create an Account</h2>
        <input type="text" id="fname" name="fname" placeholder="First Name" />
        <input type="text" id="lname" name="lname" placeholder="Last Name" />
        <input type="email" id="email" name="email" placeholder="Email" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Form;

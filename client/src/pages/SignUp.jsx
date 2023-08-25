import { Link } from "react-router-dom";
import instance from "../axios/axios";
import { useState } from "react";
import { Input } from "../components/Input.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      instance
        .post("/signup", formData)
        .then()
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <div className="dark:bg-[#151C24] w-full min-h-screen flex justify-between items-center">
      <div className="bg-[#212B35] w-[500px] h-screen hidden lg:block"></div>
      <p className=" dark:text-white absolute right-16 top-8 ">
        Already have an account?{" "}
        <span className="text-[#01AB55]">
          <Link to="/login">Login</Link>
        </span>{" "}
      </p>
      <div className="flex flex-col items-center w-screen">
        <form
          className="flex flex-col gap-4 sm:w-[500px] max-sm:w-10/12"
          onSubmit={handleSubmit}
        >
          <article className="dark:text-white mb-4 self-start">
            <h2 className="font-bold text-2xl mb-2">Create an account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              It&apos;s quick and easy.
            </p>
          </article>
          <div className="flex gap-4 max-sm:flex-col">
            <Input
              type="text"
              placeholder="First name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
            <Input
              type="text"
              placeholder="Last name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            className="bg-[#01AB55] text-white p-3 rounded-lg active:bg-green-500 "
            type="submit"
          >
            Sign Up
          </button>
          <p className="dark:text-gray-400 text-center text-xs">
            By signing up. I agree to{" "}
            <span className="underline dark:text-gray-300">
              <a href="">Terms of Service</a>
            </span>{" "}
            and{" "}
            <span className="underline dark:text-gray-300">
              <a href="">Privacy Policy</a>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

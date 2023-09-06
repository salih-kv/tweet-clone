import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../axios/axios";
import { Input } from "../components/Input.jsx";
import Cookies from 'js-cookie'; 
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance
        .post("/login", formData)
        .then((res) =>{
          
          console.log(res)
          localStorage.setItem('userToken', JSON.stringify(res.data.token));
        } )
        .catch((err) => console.log(err));
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <div className="dark:bg-[#151C24] w-full min-h-screen flex justify-between items-center">
      <div className="bg-[#212B35] w-[500px] h-screen hidden lg:block"></div>

      <p className=" absolute right-16 top-8 dark:text-white">
        Don&apos;t have an account?{" "}
        <span className="text-[#01AB55]">
          <Link to="/signup">Get started</Link>
        </span>{" "}
      </p>

      <div className="flex flex-col items-center w-screen">
        <form
          className="flex flex-col gap-4 sm:w-[500px] max-sm:w-10/12"
          onSubmit={handleSubmit}
        >
          <article className=" mb-4 self-start">
            <h2 className="font-bold dark:text-white text-2xl mb-2">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details below
            </p>
          </article>
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
          <div className="flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <p className="dark:text-white text-sm">Remember me</p>
            </div>
            <Link className="text-[#01AB55] text-sm font-medium" to="">
              Forgot password?
            </Link>
          </div>
          <button
            className="bg-[#01AB55] text-white p-3 rounded-lg active:bg-green-500  "
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

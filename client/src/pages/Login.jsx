import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import instance from "../axios/axios";
import LoginContext from "../context/LoginContext.js";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsTwitter } from "react-icons/bs";
import { InputField } from "../components/InputField";
import { InputError } from "../components/InputError";

const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const [errorMsg, setErrorMsg] = useState();

  const [token] = useState(localStorage.getItem("userToken"));

  const userSchema = yup.object({
    username: yup.string().required("Please Enter Username"),
    password: yup.string().required("Please Enter Password"),
  });

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const formSubmit = async (data, e) => {
    e.preventDefault();
    try {
      let response = await instance.post("/login", data);

      (await response.data.status) && setLoggedIn(true);
      response && localStorage.setItem("userToken", response.data.data.token);
      setErrorMsg(() => response);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  useEffect(() => {
    if (token) {
      let response = instance.post("/verifyToken");

      if (response.status) setLoggedIn(true);
    }
    loggedIn && navigate("/");
  }, [loggedIn, token, setLoggedIn, navigate]);

  return (
    <div className="dark:bg-primary-bg w-full min-h-screen flex justify-between items-center">
      <div className=" w-[600px] max-lg:hidden lg:block px-4 ">
        <div
          className="dark:bg-secondary-bg dark:text-white flex flex-col items-center justify-center shadow rounded-lg p-4 relative"
          style={{ height: "calc(100vh - 2rem)" }}
        >
          <div className="absolute top-3 left-8">
            <Link to="/">
              <BsTwitter className="text-3xl text-blue-500" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-12 tracking-wide">
            Hi, Welcome back
          </h1>
          {/* <img src="" alt="illustration_login" className="w-72" /> */}
        </div>
      </div>

      <p className=" absolute right-16 top-8 dark:text-white">
        Don&apos;t have an account?{" "}
        <span className="text-blue-500">
          <Link to="/signup">Get started</Link>
        </span>{" "}
      </p>

      <div className="flex flex-col items-center w-screen">
        <form
          className="flex flex-col gap-4 sm:w-[500px] max-sm:w-10/12"
          onSubmit={handleSubmit(formSubmit)}
        >
          <article className=" mb-4 self-start">
            <h2 className="font-bold dark:text-white text-2xl mb-2">
              Sign in to your account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your details below
            </p>
          </article>
          <div className="flex flex-col gap-4">
            <InputField
              type="text"
              placeholder="Username"
              name="username"
              register={register}
              error={errors.username}
            />

            <InputError error={errors.username} />

            <InputField
              type="password"
              placeholder="Password"
              name="password"
              register={register}
              error={errors.password}
            />
            <InputError error={errors.password} />
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <p className="dark:text-white text-sm">Remember me</p>
            </div>
            <Link className="text-blue-500 text-sm font-medium" to="">
              Forgot password?
            </Link>
          </div>

          {errorMsg && (
            <div className="mb-4">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                {errorMsg?.data.message}
              </div>
            </div>
          )}

          <button className="btn-primary p-3 rounded-lg" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

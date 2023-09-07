import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import instance from "../axios/axios";
import LoginContext from "../context/LoginContext.js";
import * as yup from "yup"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
const Login = () => {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  const [errorMsg, setErrorMsg] = useState();


  const userSchema=yup.object({
    username:yup.string().required("*Please Enter Username"),
    password:yup.string().required("*Please Enter Username")
  })



  const navigate = useNavigate();

  const {handleSubmit, register,  formState: { errors } } = useForm({ resolver: yupResolver(userSchema) });


  const formSubmit=async(data,e)=>{
    console.log(data);
    e.preventDefault();
    try {
          let response = await instance.post("/login", data);
         
          (await response.data.status) && setLoggedIn(true);
          response && localStorage.setItem("userToken", JSON.stringify(response.data.token));
          setErrorMsg(() => response);
          console.log(response);
        } catch (err) {
          console.log("Error: ", err.message);
        }


  }
  useEffect(() => {
    loggedIn && navigate("/profile");
  }, [loggedIn]);

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
          <input
            type="text"
            placeholder="Username"
            // name="username"
            // value={formData.username}
            {...register("username")}
         
          />
          <p  className="text-red-500">{errors.username?.message}</p>
          <input
            type="password"
            placeholder="Password"
            // name="password"
            // value={formData.password}
            {...register("password")}
          />
           <p  className="text-red-500">{errors.password?.message}</p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <p className="dark:text-white text-sm">Remember me</p>
            </div>
            <Link className="text-[#01AB55] text-sm font-medium" to="">
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

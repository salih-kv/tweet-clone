import { Link, useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignUp = () => {
  const navigate = useNavigate();
  // form validation
  const userSchema = yup.object().shape({
    fname: yup.string().required("*Please Enter First Name"),
    lname: yup.string().required("*Please Enter Last Name"),
    username: yup
      .string()
      .required("*Please Enter Username")
      .min(6, "Username must be at least 6 characters")
      .matches(/^[a-zA-Z][a-zA-Z0-9_-]*[a-zA-Z0-9]$/, {
        message: "Invalid username format",
        excludeEmptyString: true,
      })
      .test(
        "no-underscore-hyphen-end",
        "Username cannot end with _ or -",
        (value) => {
          if (value && (value.endsWith("_") || value.endsWith("-"))) {
            return false;
          }
          return true;
        }
      ),
    password: yup.string().min(4).max(12).required("*Please Enter Password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const formSubmit = async (data, e) => {
    console.log(e);
    e.preventDefault();

    try {
      console.log(data);
      await instance.post("/signup", data);
      data && navigate("/login");
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
          onSubmit={handleSubmit(formSubmit)}
        >
          <article className="dark:text-white mb-4 self-start">
            <h2 className="font-bold text-2xl mb-2">Create an account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              It&apos;s quick and easy.
            </p>
          </article>
          <div className="flex gap-4 max-sm:flex-col">
            <input
              type="text"
              placeholder="First name"
              {...register("fname", { required: "First Name is required" })}
              className="p-3 rounded-lg w-full dark:bg-[#151C24] dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500"
            />

            <input
              type="text"
              placeholder="Last name"
              {...register("lname", { required: "Last Name is required" })}
              className="p-3 rounded-lg w-full dark:bg-[#151C24] dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500"
            />
          </div>
          {(errors.fname || errors.lname) && (
            <>
              {
                <p className="text-red-500">
                  {errors.fname?.message || errors.lname?.message}
                </p>
              }
            </>
          )}
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="p-3 rounded-lg w-full dark:bg-[#151C24] dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500"
          />

          <p className="text-red-500">{errors.username?.message}</p>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="p-3 rounded-lg w-full dark:bg-[#151C24] dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500"
          />
          <p className="text-red-500">{errors.password?.message}</p>
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

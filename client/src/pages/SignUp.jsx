import { Link, useNavigate } from "react-router-dom";
import instance from "../axios/axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BsTwitter } from "react-icons/bs";

import { InputField } from "../components/InputField";
import { InputError } from "../components/InputError";

const SignUp = () => {
  const navigate = useNavigate();
  // form validation
  const userSchema = yup.object().shape({
    fname: yup.string().required("Please Enter First Name"),
    lname: yup.string().required("Please Enter Last Name"),
    username: yup
      .string()
      .required("Please Enter Username")
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
    password: yup.string().min(4).max(12).required("Please Enter Password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const formSubmit = async (data, e) => {
    e.preventDefault();

    try {
      await instance.post("/signup", data);
      data && navigate("/login");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  return (
    <div className="dark:bg-primary-bg dark:text-white w-full min-h-screen flex justify-between items-center">
      <div className=" w-[600px] max-lg:hidden lg:block px-4">
        <div
          className="dark:bg-secondary-bg flex flex-col items-center justify-center shadow rounded-lg p-8 relative"
          style={{ height: "calc(100vh - 2rem)" }}
        >
          <div className="absolute top-3 left-8">
            <Link to="/">
              <BsTwitter className="text-3xl text-blue-500" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-12 tracking-wide">
            Get tweeting! Signup up now.
          </h1>
          {/* <img src="" alt="illustration_signup" className="w-72" /> */}
        </div>
      </div>
      <p className=" dark:text-white absolute right-16 top-8 ">
        Already have an account?{" "}
        <span className="text-blue-500">
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
            <InputField
              type="text"
              placeholder="First name"
              name="fname"
              register={register}
              error={errors.fname}
            />
            <InputField
              type="text"
              placeholder="Last name"
              name="lname"
              register={register}
              error={errors.lname}
            />
          </div>
          <InputError error={errors.fname || errors.lname} />
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
          <button className="btn-primary p-3 rounded-lg" type="submit">
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

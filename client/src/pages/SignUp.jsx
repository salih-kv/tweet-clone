import { Link } from "react-router-dom";
import instance from "../axios/axios";
// import { useState } from "react";
// import { Input } from "../components/Input.jsx";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    // !form validation
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
            .test("no-underscore-hyphen-end", "Username cannot end with _ or -", (value) => {
                if (value && (value.endsWith("_") || value.endsWith("-"))) {
                    return false;
                }
                return true;
            }),
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
            await instance
                .post("/signup", data)
                .then()
                .catch((err) => console.log(err));
            data && navigate("/login");
        } catch (err) {
            console.log("Error: ", err.message);
        }
    };

    //! till here

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
                <form className="flex flex-col gap-4 sm:w-[500px] max-sm:w-10/12" onSubmit={handleSubmit(formSubmit)}>
                    <article className="dark:text-white mb-4 self-start">
                        <h2 className="font-bold text-2xl mb-2">Create an account</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">It&apos;s quick and easy.</p>
                    </article>
                    <div className="flex gap-4 max-sm:flex-col">
                        <input
                            type="text"
                            placeholder="First name"
                            // name="fname"
                            // value={formData.fname}
                            {...register("fname", { required: "First Name is required" })}
                            // onChange={handleChange}
                        />

                        {/* <p>{errors.fname?.message}</p> */}
                        <input
                            type="text"
                            placeholder="Last name"
                            // name="lname"
                            // value={formData.lname}
                            {...register("lname", { required: "Last Name is required" })}
                            // onChange={handleChange}
                        />

                        {/* <>   <p  className="error-message">{errors.lname?.message}</p></>  */}
                    </div>
                    {(errors.fname || errors.lname) && (
                        <>{<p className="error-message">{errors.fname?.message || errors.lname?.message}</p>}</>
                    )}
                    <input
                        type="text"
                        placeholder="Username"
                        // name="username"
                        // value={formData.username}
                        {...register("username")}
                        // onChange={handleChange}
                    />

                    <p>{errors.username?.message}</p>
                    <input
                        type="password"
                        placeholder="Password"
                        // name="password"
                        // value={formData.password}
                        {...register("password")}
                        // onChange={handleChange}
                    />
                    <p>{errors.password?.message}</p>
                    <button className="bg-[#01AB55] text-white p-3 rounded-lg active:bg-green-500 " type="submit">
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

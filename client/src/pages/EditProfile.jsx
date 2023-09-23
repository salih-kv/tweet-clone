import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import { BiSolidHide, BiShowAlt } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instance from "../axios/axios.js";

import { Button } from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import { InputError } from "../components/InputError.jsx";
import { InputField } from "../components/InputField.jsx";

const EditProfile = () => {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("userToken"));

  const [show, setShow] = useState(false);
  const userId = Cookies.get("userId");
  const [user, setUser] = useState();

  // ~ form validation schema
  const userSchema = yup.object({
    fname: yup.string().required("Please Enter First Name"),
    lname: yup.string().required().required("Please Enter Last Name"),
    username: yup.string().required("Please Enter username"),
    password: yup.string().min(4).max(12).required("Please Enter password"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const formSubmit = async (data, e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      let response = await instance.post("/updateUsers", data);
      response && navigate("/profile/edit");
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  useEffect(() => {
    if (token) {
      instance
        .post("/getUser", { userId })
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err));
    }
  }, [token, setUser, userId]);

  console.log(user);

  return (
    <div className="dark:bg-primary-bg dark:text-white bg-lightPrimary">
      <div className="max-w-6xl m-auto">
        <Header />
        <section className="flex gap-24 mt-8">
          {/* Left Nav */}
          <div className="w-[500px]  h-screen">
            <ul className="list-none flex flex-col gap-2 border-r dark:border-secondary-bg">
              <li className="border-b  dark:border-secondary-bg border-b-gray-200 py-6  shadow-sm flex items-center justify-between">
                Account Settings{" "}
                <span>
                  <BsChevronRight className="font-bold mr-4" />
                </span>
              </li>
              <li className="border-b  dark:border-secondary-bg border-b-gray-200 py-6  shadow-sm flex items-center justify-between">
                Security{" "}
                <span>
                  <BsChevronRight className="font-bold mr-4" />
                </span>
              </li>
              <li className="py-6  shadow-sm flex items-center justify-between">
                Notification{" "}
                <span>
                  <BsChevronRight className="font-bold mr-4" />
                </span>
              </li>
            </ul>
          </div>
          {/* Right */}
          <div className=" dark:text-gray-500 w-full min-h-screen flex justify-between">
            <div className="w-full  px-2 flex flex-col max-md:items-center gap-12">
              <article>
                <h1 className="font-medium text-lg mb-2 dark:text-white">
                  Account Settings
                </h1>
                <p className="text-sm">
                  Change your profile and account settings
                </p>
              </article>
              <div className="flex items-center mb-4">
                <img
                  className="rounded-full mr-8"
                  src="https://placehold.co/100x100.png"
                  alt="profile-image"
                />
                <div className="flex flex-col gap-4">
                  <Button variant="fill">Change picture</Button>
                  <Button variant="outlined">Delete picture</Button>
                </div>
              </div>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="flex flex-col gap-3 text-md font-medium max-w-lg">
                  <div className="flex gap-4">
                    <div>
                      <label htmlFor="fname">First name</label>
                      <InputField
                        placeholder="First name"
                        name="fname"
                        register={register}
                        error={errors.fname}
                        id="fname"
                        // {...register("fname")}
                      />
                    </div>

                    <div>
                      <label htmlFor="lname">Last name</label>
                      <InputField
                        placeholder="Last name"
                        name="lname"
                        register={register}
                        error={errors.lname}
                        id="lname"
                        // {...register("lname")}
                      />
                    </div>
                  </div>
                  <InputError error={errors.fname || errors.lname} />
                  <div>
                    <label htmlFor="username">Username</label>
                    <InputField
                      // {...register("username")}
                      placeholder="User Name"
                      name="username"
                      register={register}
                      error={errors.username}
                      id="username"
                    />
                  </div>
                  <InputError error={errors.username} />
                  <div className="relative">
                    <label htmlFor="password">Password</label>
                    <InputField
                      // {...register("password")}
                      placeholder="Password"
                      name="password"
                      register={register}
                      error={errors.password}
                      id="password"
                      type={show ? "text" : "password"}
                    />
                    {show ? (
                      <BiShowAlt
                        className="absolute top-10 right-5 text-lg cursor-pointer"
                        onClick={() => setShow((prev) => !prev)}
                      />
                    ) : (
                      <BiSolidHide
                        className="absolute top-10 right-5 text-lg cursor-pointer"
                        onClick={() => setShow((prev) => !prev)}
                      />
                    )}
                  </div>
                  <InputError error={errors.password} />
                </div>

                <div className="flex gap-4 mt-6">
                  <Button type="submit" variant="fill">
                    Update
                  </Button>
                  <Button variant="outlined">Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;

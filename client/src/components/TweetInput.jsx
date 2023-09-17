import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import instance from "../axios/axios";

const TweetInput = () => {
  const [value, setValue] = useState("");
  const [token, setToken] = useState(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { value } = e.target;

    const textarea = textareaRef.current;
    const textareaLineHeight = 24;
    const minRows = 3;
    const maxRows = 6;

    textarea.rows = minRows; // reset number of rows in textarea

    const currentRows = Math.floor(textarea.scrollHeight / textareaLineHeight);

    textarea.rows = currentRows < maxRows ? currentRows : maxRows;
    textarea.scrollTop = textarea.scrollHeight;

    setValue(value);
  };

  const createNewTweet = async () => {
    let tokenStr = token;
    instance.interceptors.request.use(function (config) {
      config.headers.Authorization = token
        ? `Bearer ${tokenStr.replace(/['"]/g, "")}`
        : "";
      return config;
    });

    await instance.post("/createTweet", {
      userTweet: value,
    });

    setValue("");
  };

  useEffect(() => {
    setToken(localStorage.getItem("userToken"));
  }, []);

  return (
    <>
      <div className="dark:bg-secondary-bg bg-white-secondary  h-auto rounded-t-md  dark:border-primary-bg border-[.5px] border-t-0 p-4 flex gap-2">
        <div>
          <CgProfile className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <div className="w-full">
          <textarea
            ref={textareaRef}
            rows={3}
            value={value}
            onChange={handleChange}
            placeholder="What's happening?"
            className="resize-none p-3 mb-3 rounded-lg w-full bg-off-white dark:bg-tertiary-bg dark:text-white border  border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500 outline-none"
          />{" "}
          <div className="flex">
            <button
              className="btn-gradient py-2 px-4 rounded-3xl ml-auto"
              onClick={createNewTweet}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetInput;

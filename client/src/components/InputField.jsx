export const InputField = ({ type, placeholder, register, name, error }) => (
  <input
    type={type}
    placeholder={placeholder}
    {...register(name)}
    className={`p-3 rounded-lg w-full dark:bg-primary-bg dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500 outline-none ${
      error ? "border-red-500" : ""
    } `}
  />
);

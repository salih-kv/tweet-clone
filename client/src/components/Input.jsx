export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="p-3 rounded-lg w-full dark:bg-[#151C24] dark:text-white border border-gray-300 dark:border-gray-700 placeholder:text-sm placeholder:text-gray-500"
    />
  );
};

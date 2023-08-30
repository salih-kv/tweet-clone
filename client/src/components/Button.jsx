export const Button = ({ variant, ...props }) => {
  let className = "";
  if (variant === "fill") {
    className = "bg-[#01AB55] text-white active:bg-green-500";
  } else if (variant === "outlined") {
    className =
      "border border-slate-300 active:border-red-500 active:text-red-500";
  }

  return (
    <button
      className={`py-2 px-4 rounded-lg text-sm ${className}`}
      {...props}
    />
  );
};

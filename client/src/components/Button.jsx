export const Button = ({ variant, ...props }) => {
  let className = "";
  if (variant === "fill") {
    className = "bg-[#1DA1F2] text-white active:opacity-95";
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

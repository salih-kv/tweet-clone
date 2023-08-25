import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#212B35] w-full h-16 shadow-lg flex justify-around items-center p-4">
      <div>
        <Link to="/" className="text-white">
          Logo
        </Link>
      </div>
      <div>
        <button className="mx-4 border border-gray-500 p-2 rounded-lg text-white">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

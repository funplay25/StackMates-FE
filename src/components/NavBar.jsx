import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div className="absolute">
      <nav className="z-50  h-18 bg-black/20 fixed top-0 left-0 w-full">
        <div className="mx-8 py-2 flex items-center justify-between ">
          <a className="cursor-pointer">
            <img src={logo} alt="stackMates logo" className="w-46 h-fit" />
          </a>

          <button className="px-6 py-1.5 text-[18px] font-semibold text-white bg-red-600 rounded-full cursor-pointer">
            <p>Log in</p>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

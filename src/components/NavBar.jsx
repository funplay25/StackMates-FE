import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div className="absolute">
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <a>
            <img src={logo} alt="stackMates logo" className="w-36 h-fit" />
          </a>

          <button className="px-6 py-2 text-[18px] font-semibold text-white bg-red-600 rounded-lg">
            <p>Log in</p>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

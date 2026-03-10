import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

const NavBar = () => {
  const user = useSelector((store) => store?.user);

  return (
    <div className="absolute">
      <nav className="z-50  h-18 bg-black/20 fixed top-0 left-0 w-full">
        <div className="mx-8 py-2 flex items-center justify-between ">
          <a className="cursor-pointer">
            <img src={logo} alt="stackMates logo" className="w-46 h-fit" />
          </a>

          {user && (
            <div className="flex items-center gap-4">
              <p className="text-white">
                Welcome! <span className="font-semibold">{user.firstName}</span>
              </p>
              <img
                alt="user profile"
                src={user.profileUrl}
                className="w-10 rounded-full"
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

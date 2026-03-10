import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { removeuser } from "../utils/userSlice";

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogout = async () => {
    try {
      await axios.post(BE_BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeuser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setDropDown(false);
  }, []);

  return (
    <div className="absolute">
      <nav className="z-50 h-18 bg-black/20 fixed top-0 left-0 w-full">
        <div className="mx-8 py-2 flex items-center justify-between ">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="stackMates logo" className="w-46 h-fit" />
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <p className="text-white">
                Welcome! <span className="font-semibold">{user.firstName}</span>
              </p>
              <img
                alt="user profile"
                src={user.profileUrl}
                className="w-10 rounded-full cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />

              {dropDown && (
                <div className="absolute right-10 top-18 mt-2 w-48 bg-white border rounded-md z-10 cursor-pointer p-1">
                  <Link
                    to="/profile"
                    href="/profile"
                    className="block w-full text-black bg-white hover:bg-gray-100 px-4 py-2 border-b border-gray-200"
                    onClick={() => setDropDown(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      userLogout();
                      setDropDown(false);
                    }}
                    className="block w-full text-red-600 text-left bg-white hover:bg-gray-100 px-4 py-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

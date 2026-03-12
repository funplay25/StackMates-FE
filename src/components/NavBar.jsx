import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { removeuser } from "../utils/userSlice";

const NavBar = () => {
  const [dropDown, setDropDown] = useState(false);
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const signUpPage = location.pathname === "/signup";

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
    <div>
      <nav className="z-50 h-18 bg-black/20 backdrop-blur-md fixed top-0 left-0 w-full">
        <div className="mx-8 py-2 flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <img src={logo} alt="stackMates logo" className="w-46 h-fit" />
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <img
                alt="user profile"
                src={user.profileUrl}
                className="h-12 w-12 rounded-full object-cover object-top border-2 border-gray-200 cursor-pointer active:scale-[0.95] transition-all"
                onClick={() => setDropDown(!dropDown)}
              />

              {dropDown && (
                <div className="absolute right-6 top-16 mt-3 w-64 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 ring-1 ring-black/5 animate-in fade-in zoom-in duration-200 origin-top-right">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Account
                    </p>
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user.firstName} {user.lastName}
                    </p>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center gap-3 w-full text-gray-700 hover:text-[#f72b20] hover:bg-red-50/50 px-4 py-3 transition-all duration-200 group"
                    onClick={() => setDropDown(false)}
                  >
                    <div className="p-1.5 rounded-lg bg-gray-50 group-hover:bg-red-100/50 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <span className="font-bold text-sm">View Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      userLogout();
                      setDropDown(false);
                    }}
                    className="flex items-center gap-3 w-full text-red-500 hover:bg-red-50 px-4 py-3 transition-all duration-200 group mt-1"
                  >
                    <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                    </div>
                    <span className="font-bold text-sm cursor-pointer">
                      Log Out
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}

          {signUpPage && (
            <button
              className="px-4 py-1 text-[18px] font-semibold text-white bg-red-600 rounded-full cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { removeuser } from "../utils/userSlice";
import { clearConnections } from "../utils/connectionSlice";
import { clearRequests } from "../utils/requestSlice";

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
      dispatch(clearConnections());
      dispatch(clearRequests());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setDropDown(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-20 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className="shrink-0">
          {user ? (
            <Link to="/" className="block hover:opacity-80 transition-opacity">
              <img
                src={logo}
                alt="stackMates logo"
                className="w-40 h-auto object-contain"
              />
            </Link>
          ) : (
            <img
              src={logo}
              alt="stackMates logo"
              className="w-40 h-auto object-contain"
            />
          )}
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropDown(!dropDown)}
                className={`flex items-center p-0.5 rounded-full transition-all duration-300 outline-none
              ${dropDown ? "ring-4 ring-red-500/10" : "hover:ring-4 hover:ring-gray-100"}`}
              >
                <img
                  alt="user profile"
                  src={user.profileUrl}
                  className="h-11 w-11 rounded-full object-cover object-top border-2 border-white shadow-sm cursor-pointer"
                />
              </button>

              {dropDown && (
                <>
                  <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setDropDown(false)}
                  ></div>

                  <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">
                        Logged in as
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {user.firstName} {user.lastName}
                      </p>
                    </div>

                    <div className="p-2">
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

                      <Link
                        to="/connections"
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
                              d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                            />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">Friends</span>
                      </Link>

                      <Link
                        to="/requests"
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
                              d="M19 7.5v9m-4.5-4.5h9M3.75 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632zM8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"
                            />
                          </svg>
                        </div>
                        <span className="font-bold text-sm">
                          Friend Requests
                        </span>
                      </Link>

                      <div className="h-px bg-gray-100 my-1 mx-2" />

                      <button
                        onClick={() => {
                          userLogout();
                          setDropDown(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 group cursor-pointer"
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
                        <span className="font-bold text-sm">Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {signUpPage && !user && (
            <button
              className="px-6 py-2.5 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-full shadow-lg shadow-red-200 transition-all active:scale-95 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

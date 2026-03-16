import { useState } from "react";
import bgImg from "../assets/bg-pic.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BE_BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BE_BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      setError("User with this email alredy exists.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gray-900">
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden my-8">
        <div className="p-6 sm:p-8 md:p-10">
          <header className="mb-6 md:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
              Build Friendships,{" "}
              <span className="text-[#f72b20] sm:block">Not Just Code.</span>
            </h2>
          </header>

          <form
            className="space-y-4 md:space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f72b20] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                  value={firstName}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Wick"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f72b20] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                  value={lastName}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f72b20] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f72b20] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-semibold px-1">{error}</p>
            )}

            <button
              onClick={handleSignUp}
              className="w-full bg-[#f72b20] hover:bg-[#d6251b] text-white font-bold py-3.5 md:py-4 rounded-xl transition-all shadow-lg shadow-red-100 active:scale-[0.98] cursor-pointer text-sm md:text-base mt-2"
            >
              Create Account
            </button>
          </form>

          <footer className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-[#f72b20] font-bold hover:underline underline-offset-4 cursor-pointer"
              >
                Log In
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Signup;

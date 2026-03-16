import axios from "axios";
import { useState } from "react";
import { BE_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import bgImg from "../assets/bg-pic.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BE_BASE_URL + "/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError("Email or password is wrong.");
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

      <div className="relative z-10 w-[95%] sm:w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden transition-all duration-300">
        <div className="p-6 sm:p-8 md:p-10">
          <header className="mb-6 md:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Enter your details to access your account
            </p>
          </header>

          <form
            className="space-y-4 md:space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f72b20] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <input
                type="password"
                placeholder="••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f72b20] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-sm md:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="text-xs md:text-sm text-red-500 font-semibold animate-pulse">
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              className="w-full bg-[#f72b20] hover:bg-[#d6251b] text-white font-bold py-3.5 md:py-4 rounded-xl transition-all shadow-lg shadow-red-100 active:scale-[0.98] cursor-pointer text-sm md:text-base mt-2"
            >
              Log In to Your Account
            </button>
          </form>

          <footer className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              New here?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#f72b20] font-bold hover:underline underline-offset-4 cursor-pointer"
              >
                Create an account
              </button>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Login;

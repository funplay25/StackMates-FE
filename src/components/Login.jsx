import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("elon@gmail.com");
  const [password, setPassword] = useState("Elon1!");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="text-gray-500 text-sm">Join our community today.</p>
        </header>

        <form className="space-y-3" onClick={(e) => e.preventDefault()}>
          <div>
            <label
              for="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f72b20]/70 focus:border-[#f72b20]/70 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label
              for="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              placeholder="John@1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f72b20]/70 focus:border-[#f72b20]/70 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full bg-[#f72b20] hover:bg-[#f72b20] text-white font-bold py-2.5 px-4 rounded-full transition-colors duration-200 hover:shadow-md cursor-pointer mt-4"
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import EarthCanvas from "./EarthCanvas";
import StarrySky from "../utils/StarrySky";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const loginData = { username, email, password };
    let loginSuccess = false;

    try {
      // Check the role and call the corresponding API endpoint
      if (role === "Manager") {
        const response = await axios.post("/api/auth/managerSignup", loginData);

        if (response.status === 200) {
          // Store the JWT token in localStorage or a cookie
          localStorage.setItem("token", response.data.token);

          // Navigate to Manager Dashboard
          navigate("/manager-dashboard");
          loginSuccess = true;
        }
      } else {
        const response = await axios.post("/api/auth/clientSignup", loginData);

        if (response.status === 200) {
          // Store the JWT token in localStorage or a cookie
          localStorage.setItem("token", response.data.token);

          // Navigate to Manager Dashboard
          navigate("/dashboard");
          loginSuccess = true;
        }
        console.log("User login logic here.");
      }

      if (!loginSuccess) {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="bg-black w-screen h-screen flex">
      <div className="flex-1 relative">
        <StarrySky />
        <EarthCanvas />
      </div>

      {/* Right side: Form */}
      <div className="w-[35%] h-[80%] mt-[5%] mr-[10%] p-6 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="text-neutral-100 py-6 relative overflow-hidden flex flex-col justify-around w-full h-full border border-neutral-500 rounded-lg bg-black/10 backdrop-blur-[1.5px] p-6"
        >
          <div className="before:absolute before:w-32 before:h-20 before:right-2 before:bg-rose-300 before:-z-10 before:rounded-full before:blur-xl before:-top-12 z-10 after:absolute after:w-24 after:h-24 after:bg-purple-300 after:-z-10 after:rounded-full after:blur after:-top-12 after:-right-6">
            <span className="font-extrabold text-2xl text-violet-400">
              Signup
            </span>
            <p className="text-neutral-400">Please log in to continue</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            
            <div className="relative rounded-lg w-full overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500/30 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300/30 after:right-12 after:top-3 after:rounded-full border border-neutral-500 after:blur-lg">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="relative bg-transparent ring-0 outline-none text-neutral-100 rounded-lg block w-full p-2.5"
                placeholder="Username"
              />
            </div>


            <div className="relative rounded-lg w-full overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500/30 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300/30 after:right-12 after:top-3 after:rounded-full border border-neutral-500 after:blur-lg">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="relative bg-transparent ring-0 outline-none text-neutral-100 rounded-lg block w-full p-2.5"
                placeholder="Email"
              />
            </div>

            {/* Password Input */}
            <div className="relative rounded-lg w-full overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500/30 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300/30 after:right-12 after:top-3 after:rounded-full border border-neutral-500 after:blur-lg">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="relative bg-transparent ring-0 outline-none text-neutral-100 rounded-lg block w-full p-2.5"
                placeholder="Password"
              />
            </div>

            {/* Role Dropdown */}
            <div className="relative rounded-lg w-full overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500/30 before:rounded-full before:blur-lg after:absolute after:z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300/30 after:right-12 after:top-3 after:rounded-full border border-neutral-500 after:blur-lg">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="relative bg-transparent ring-0 outline-none text-neutral-100 rounded-lg block w-full p-2.5"
              >
                <option value="User" className="bg-black text-white">User</option>
                <option value="Manager" className="bg-black text-white">Manager</option>
              </select>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="font-semibold bg-violet-500 text-neutral-50 p-2 rounded-lg hover:bg-violet-500/80 duration-500 mt-4"
            >
              Signup
            </button>
            <p className="text-neutral-400">
              Don&apos;t have an account?{''}
              <a href="/login" className="text-violet-500 cursor-pointer">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

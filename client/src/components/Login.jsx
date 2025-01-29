import  { useState } from "react";
import EarthCanvas from "./EarthCanvas";
import StarrySky from "../utils/StarrySky";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare the data to send to the backend
    const requestData = {
      email,
      password,
      role,
    };
  
    // Determine which API to call based on the role
    const apiUrl = role === "Manager"
      ? '/api/auth/managerSignin'   // Manager signup API
      : '/api/auth/clientSignin';   // Client signup API
  
    // Make the fetch call to the appropriate API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),  // Send the email, password, and role data
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response:', data);
        
        // Assuming the backend sends a success message, navigate to the dashboard
        if (data.success) {
          localStorage.setItem("role", role);  // Store the role in localStorage
          navigate('/dashboard');  // Redirect to dashboard
        } else {
          console.error(data.message);  // Handle error if the backend returns a message
        }
      })
      .catch((error) => {
        console.error('Error during submission:', error);
      });

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
              Welcome Back
            </span>
            <p className="text-neutral-400">Please log in to continue</p>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {/* Email Input */}
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
              Login
            </button>
            <p className="text-neutral-400">
              Havent made an account?{" "}
              <a href="/register" className="text-violet-500 cursor-pointer">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/base";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    const user = {
      email,
      password,
    };
    try {
      await api.post("/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (error) {
      console.error("Registration failed!", error);
      alert(error);
    }
  };
  return (
    <div className="h-screen w-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-5/4 justify-center py-10 items-center bg-white">
        <form className="bg-white" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center">{error}</p>}{" "}
          <h1 className="text-gray-800 font-bold text-2xl mb-4">
            Welcome back!
          </h1>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
            <MdAlternateEmail className="text-gray-400" />

            <input
              className="pl-2 outline-none border-none  text-gray-800"
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
            <RiLockPasswordFill className="text-gray-400" />
            <input
              className="pl-2 outline-none border-none text-gray-800"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Login
          </button>
          <span className="text-sm ml-2 text-gray-400 hover:text-blue-500 cursor-pointer">
            Forgot Password ?
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;

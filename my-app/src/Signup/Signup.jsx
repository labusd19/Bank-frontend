import { FaHouse } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/base";

function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname,
      email,
      password,
      adress,
      phone,
      birthdate,
    };
    try {
      await api.post("/register", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Client added successfully!");
      setFullname("");
      setEmail("");
      setPassword("");
      setAdress("");
      setPhone("");
      setBirthdate("");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed!", error);
      setError(error);
    }
  };
  return (
    <div className="h-screen w-screen md:flex">
      <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
        <div>
          <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>
          <p className="!text-white mt-1">
            The most popular peer to peer lending at SEA
          </p>
          <button
            type="submit"
            className="block w-28 bg-white text-indigo-800 hover:bg-indigo-500 hover:text-white mt-4 py-2 rounded-2xl font-bold mb-2"
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
        <form className="bg-white" onSubmit={handleRegistration}>
          {error && <p className="text-red-500 text-center">{error}</p>}{" "}
          <h1 className="text-gray-800 font-bold text-2xl mb-4">
            Registration
          </h1>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
            <FaUser className="text-gray-400" />
            <input
              className="pl-2 outline-none border-none text-gray-800"
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Full name"
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
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
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
            <FaHouse className="text-gray-400" />

            <input
              className="pl-2 outline-none border-none  text-gray-800"
              type="text"
              name="adress"
              id="adress"
              placeholder="Adress"
              onChange={(e) => setAdress(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
            <FaPhoneAlt className="text-gray-400" />

            <input
              className="pl-2 outline-none border-none  text-gray-800"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone number..."
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-2">
            <FaCalendarAlt className="text-gray-400" />

            <input
              className="pl-2 outline-none border-none  text-gray-400"
              type="date"
              name="birthdate"
              id="birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

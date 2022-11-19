import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const loggedUser = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  function handleChange({ target: { name, value } }) {
    setUser({ ...user, [name]: value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      // await login(user.email, user.password);
      if (!e.target.checkValidity()) {
        console.log("review input data");
      } else {
        dispatch(login(user));
        toast("Logging to the site");
        setTimeout(() => navigate("/home"), [5000]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center rounded-lg shadow-lg">
      <ToastContainer />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col bg-blue-400 w-96 h-56 rounded-lg opacity-70 items-center justify-center"
      >
        <label htmlFor="email" className="font-bold">
          Email
        </label>
        <input
          type="email"
          placeholder="youremail@company.com"
          name="email"
          id="email"
          className="rounded-lg shadow-lg "
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="password" className="font-bold">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          className="rounded-lg shadow-lg "
          onChange={(e) => handleChange(e)}
        />

        <button className="font-bold border w-20 h-10 hover:bg-gray-200 rounded mt-5 shadow-lg">
          Login
        </button>
      </form>
    </div>
  );
}

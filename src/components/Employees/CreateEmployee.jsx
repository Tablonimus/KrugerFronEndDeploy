import React, { useState } from "react";

import { TextInput, Label } from "flowbite-react";
import NavBar from "../Bars/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions";
import AdminBar from "../Bars/AdminBar";
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  if (!loggedUser || loggedUser.admin === false ) navigate("/");


  const registeredUsers = useSelector((state) => state.employees);

  const [newUser, setNewUser] = useState({
    identification: "",
    name: "",
    last_name: "",
    email: "",
  });

  const [error, setError] = useState({
    identification: "",
    name: "",
    last_name: "",
    email: "",
  });

  function handleChange({ target: { name, value } }) {
    if (name === "identification") {
      if (value.length < 10) setError({ ...error, identification: true });

      if (value.length === 10 && value.match("^[0-9]+$"))
        setError({ ...error, identification: false });
    }
    if (name === "email") {
      if (
        value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) === null
      ) {
        setError({ ...error, email: true });
      }

      if (
        value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
        setError({ ...error, email: false });
    }

    if (name === "name") {
      if (value.length > 20) setError({ ...error, name: true });
      if (value.match("^[a-zA-Z ]+$") === null)
        setError({ ...error, name: true });
      if (value.length < 3 && value.match("^[a-zA-Z ]+$") === null)
        setError({ ...error, name: true });
      if (value.length >= 3 && value.match("^[a-zA-Z ]+$"))
        setError({ ...error, name: false });
    }
    if (name === "last_name") {
      if (value.length > 20) setError({ ...error, last_name: true });
      if (value.match("^[a-zA-Z ]+$") === null)
        setError({ ...error, last_name: true });
      if (value.length < 3 && value.match("^[a-zA-Z ]+$") === null)
        setError({ ...error, last_name: true });
      if (value.length >= 3 && value.match("^[a-zA-Z ]+$"))
        setError({ ...error, last_name: false });
    }

    setNewUser({ ...newUser, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      registeredUsers?.filter((match) => match.email === newUser?.email)
        .length > 0
    ) {
      alert("this email has been previously registered");
    } else if (
      registeredUsers?.filter(
        (match) => match.identification === newUser?.identification
      ).length > 0
    ) {
      alert("The Identification number has been previously registered");
    } else {
      const payload = {
        identification: newUser.identification,
        name: newUser.name,
        last_name: newUser.last_name,
        email: newUser.email,
        password: newUser.identification,
      };
      dispatch(createUser(payload));
      navigate("/home")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <NavBar />
      <div className="bg-blue-200 opacity-80 w-96  rounded-lg flex flex-col items-center justify-center shadow-lg">
        <h1 className="font-bold p-5">ADD A NEW EMPLOYEE</h1>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col gap-2 items-center"
        >
          <input
            type="text"
            id="name"
            name="name"
            maxLength={20}
            placeholder="Name"
            className="rounded-lg shadow-lg"
            onChange={(e) => handleChange(e)}
          />
          {error.name === "" ? (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Only letters (min 3 characters)
            </span>
          ) : error.name === false ? (
            <span className="text-[10px] text-green-600 font-bold">
              ✔ Only letters (min 3 characters)
            </span>
          ) : (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Only letters (min 3 characters)
            </span>
          )}

          <input
            type="text"
            id="last_name"
            name="last_name"
            maxLength={20}
            placeholder="Last Name"
            className="rounded-lg shadow-lg"
            onChange={(e) => handleChange(e)}
          />
          {error.last_name === "" ? (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Only letters (min 3 characters)
            </span>
          ) : error.last_name === false ? (
            <span className="text-[10px] text-green-600 font-bold">
              ✔ Only letters (min 3 characters)
            </span>
          ) : (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Only letters (min 3 characters)
            </span>
          )}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="rounded-lg shadow-lg"
            onChange={(e) => handleChange(e)}
          />
          {error.email === "" ? (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Valid Email
            </span>
          ) : error.email === false ? (
            <span className="text-[10px] text-green-600 font-bold">
              ✔ Valid Email
            </span>
          ) : (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Valid Email
            </span>
          )}
          <input
            type="text"
            id="identification"
            name="identification"
            maxLength={10}
            minLength={10}
            placeholder="Identification"
            className="rounded-lg shadow-lg "
            onChange={(e) => handleChange(e)}
          />
          {error.identification === "" ? (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Must have 10 numbers
            </span>
          ) : error.identification === false ? (
            <span className="text-[10px] text-green-600 font-bold">
              ✔ Must have 10 numbers
            </span>
          ) : (
            <span className="text-[10px] text-red-500 font-bold">
              ❌ Must have 10 numbers
            </span>
          )}

          {error.email === false &&
          error.identification === false &&
          error.last_name === false &&
          error.name === false ? (
            <button className="m-5 bg-green-600 opacity-90 hover:bg-green-500 hover:opacity-100 shadow-lg rounded-lg w-24 text-white h-14">
              Register
            </button>
          ) : (
            <span className=" m-5 flex items-center justify-center bg-gray-500 shadow-lg rounded-lg w-24 text-white h-14 opacity-70">
              Register
            </span>
          )}
        </form>
      </div>
      {loggedUser?.admin === true ? <AdminBar /> : false}
    </div>
  );
}

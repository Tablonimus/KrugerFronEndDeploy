import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { useDispatch } from "react-redux";

import { patchUser } from "../../redux/actions";
import dele from "../../assets/images/dele.png";
import edit from "../../assets/images/edit.png";
import { Navigate, useNavigate } from "react-router-dom";

export default function Employee({
  adress,
  birthdate,
  email,
  identification,
  name,
  last_name,
  phone,
  vaccination_status,
  vaccine_date,
  vaccine_dose,
  vaccine_type,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    identification: identification,
    name: name,
    last_name: last_name,
    email: email,
    phone: phone,
    adress: adress,
    birthdate: birthdate,
  });

  const [error, setError] = useState({
    identification: "",
    name: "",
    last_name: "",
    email: "",
  });

  function handleChange({ target: { name, value } }) {
    console.log(name, value);
    setNewUser({ ...newUser, [name]: value });
    console.log(newUser.birthdate);
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
  }

  function handleSubmit(e) {
    const payload = {
      identification: newUser.identification,
      name: newUser.name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.identification,
      birthdate: newUser.birthdate,
      adress: newUser.adress,
      phone: newUser.phone,
    };
    dispatch(patchUser(payload));

    dispatch(patchUser(payload)).then(navigate("/employees"));
  }

  const [modal, setModal] = useState(false);

  function onClose() {
    setModal(false);
  }
  function onClick() {
    setModal(true);
  }

  function onDelete() {
    const payload = {
      identification: newUser.identification,
      deleted: true,
    };
    dispatch(patchUser(payload));
  }
  return (
    <div className="bg-gray-200 w-96 justify-between rounded-lg shadow-lg flex  p-5 font-bold">
      <div className="flex flex-col">
        <span>
          Name: {name} {last_name}
        </span>

        <span>Email: {email}</span>
        <span>ID: {identification}</span>

        <span className="flex font-semibold">
          {vaccination_status ? (
            <div className="flex flex-col">
              <span className="text-green-500 text-lg font-bold">Vaccined</span>
              <span className="text-sm">Type: {vaccine_type}</span>
              <span className="text-sm">Dose: {vaccine_dose}</span>
              <span className="text-sm">Date: {vaccine_date}</span>
            </div>
          ) : (
            <span className="text-red-500 text-lg font-bold">Not vaccined</span>
          )}
        </span>
      </div>
      <div className="flex flex-col justify-between">
        <button
          onClick={onClick}
          className="flex  items-center justify-center m-1 w-10  rounded-lg  p-2 bg-yellow-200 opacity-60 hover:opacity-100 hover:bg-yellow-300"
        >
          <img src={edit} alt="" className="w-6" />
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center m-1 w-10  rounded-lg  p-2 bg-red-600 opacity-60 hover:opacity-100 hover:bg-red-500"
        >
          <img src={dele} alt="" className="w-6" />
        </button>
      </div>

      <Modal
        show={modal}
        size="lg"
        popup={true}
        onClose={onClose}
        className="bg-gray-600 rounded"
      >
        <Modal.Header className="bg-blue-400 opacity-80 " />
        <Modal.Body className="bg-blue-400 opacity-80">
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 flex flex-col items-center ">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Edit employee information
            </h3>
            <div className=" rounded-lg flex flex-col ">
              <form
                action=""
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col gap-2 items-center"
              >
                <div className="flex gap-1">
                  <div>
                    <label htmlFor="name" className="font-semibold">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      maxLength={20}
                      placeholder={name}
                      className="rounded-lg shadow-lg"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.name === "" ? (
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
                      )} */}
                  </div>
                  <div>
                    <label htmlFor="last_name" className="font-semibold">
                      Last name:
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      maxLength={20}
                      placeholder={last_name}
                      className="rounded-lg shadow-lg"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.last_name === "" ? (
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
                      )} */}
                  </div>
                </div>

                <div className="flex gap-1">
                  <div>
                    <label htmlFor="email" className="font-semibold">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder={email}
                      className="rounded-lg shadow-lg"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.email === "" ? (
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
                      )} */}
                  </div>
                  <div>
                    <label htmlFor="identification" className="font-semibold">
                      Identification:
                    </label>
                    <input
                      type="text"
                      id="identification"
                      name="identification"
                      maxLength={10}
                      minLength={10}
                      placeholder={identification}
                      className="rounded-lg shadow-lg "
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.identification === "" ? (
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
                      )} */}
                  </div>
                </div>
                <div className="flex gap-1">
                  <div>
                    <label htmlFor="phone" className="font-semibold">
                      Phone:
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      placeholder={phone || "-"}
                      className="rounded-lg shadow-lg"
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.email === "" ? (
                        <span className="text-[10px] text-red-500 font-bold">
                          ❌ Valid Phone
                        </span>
                      ) : error.email === false ? (
                        <span className="text-[10px] text-green-600 font-bold">
                          ✔ Valid Phone
                        </span>
                      ) : (
                        <span className="text-[10px] text-red-500 font-bold">
                          ❌ Valid Phone
                        </span>
                      )} */}
                  </div>
                  <div>
                    <label htmlFor="adress" className="font-semibold">
                      Adress:
                    </label>
                    <input
                      type="text"
                      id="adress"
                      name="adress"
                      maxLength={30}
                      minLength={10}
                      placeholder={adress || "-"}
                      className="rounded-lg shadow-lg "
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.identification === "" ? (
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
                      )} */}
                  </div>
                </div>
                <div className="flex gap-1">
                  <div>
                    <label htmlFor="birthdate" className="font-semibold">
                      Birth:
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      placeholder={birthdate || "-"}
                      className="rounded-lg shadow-lg "
                      onChange={(e) => handleChange(e)}
                    />
                    {/* {error.identification === "" ? (
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
                      )} */}
                  </div>
                </div>

                <button className="bg-green-600 opacity-90 hover:bg-green-500 hover:opacity-100 shadow-lg rounded-lg w-24 text-white h-14">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

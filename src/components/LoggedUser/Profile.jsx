import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../Bars/NavBar";
import edit from "../../assets/images/edit.png";
import profile from "../../assets/images/profile.png";
import { patchUser } from "../../redux/actions";
import { Modal, Tooltip } from "flowbite-react";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  if (!loggedUser) navigate("/");
  console.log(loggedUser);

  const [newUser, setNewUser] = useState({
    identification: loggedUser?.identification,
    name: loggedUser?.name,
    last_name: loggedUser?.last_name,
    email: loggedUser?.email,
    phone: loggedUser?.phone,
    adress: loggedUser?.adress,
    birthdate: loggedUser?.birthdate,
    vaccination_status: loggedUser?.vaccination_status,
    vaccines: loggedUser?.vaccines,
  });

  const [error, setError] = useState({
    identification: "",
    name: "",
    last_name: "",
    email: "",
  });
  const [status, setStatus] = useState(false);
  const [vaccines, setVaccines] = useState({
    type: "",
    dose: "",
    date: "",
  });

  function vaccination() {
    if (status) {
      setStatus(false);
    } else setStatus(true);
  }

  const [modal, setModal] = useState(false);
  function onClose() {
    setModal(false);
  }
  function onClick() {
    setModal(true);
  }

  function handleChange({ target: { name, value } }) {
    setNewUser({ ...newUser, [name]: value });

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
      identification: loggedUser.identification,
      name: newUser.name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.identification,
      birthdate: newUser.birthdate,
      adress: newUser.adress,
      phone: newUser.phone,
      vaccination_status: status,
      vaccine_type: vaccines.type,
      vaccine_date: vaccines.date,
      vaccine_dose: vaccines.dose,
    };

    dispatch(patchUser(payload)).then(navigate("/profile"));
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <NavBar />
      <div className="bg-gray-200 w-11/12 h-96 flex  items-center justify-around rounded-lg opacity-80">
        <div className="flex flex-col h-56 justify-around pl-10 gap-2">
          <span className="text-4xl font-bold mt-4 border-b border-black">
            {loggedUser.name} {loggedUser.last_name}
          </span>
          <span className="font-semibold">Email: {loggedUser.email}</span>
          <span className="font-semibold">
            Adress: {loggedUser.adress ? loggedUser.adress : "-"}
          </span>
          <span className="font-semibold">
            Birthdate: {loggedUser.birthdate ? loggedUser.birthdate : "-"}
          </span>
          <span className="font-semibold">
            Phone: {loggedUser.phone ? loggedUser.phone : "-"}
          </span>
          <span className="font-semibold">
            Vaccination Status:{" "}
            {loggedUser.vaccination_status ? (
              <span className="text-green-500 font-bold">Vaccined</span>
            ) : (
              <span className="text-red-500 font-bold">Not vaccined</span>
            )}
          </span>
          <span className="flex font-semibold">
            <span className="mr-2">Vaccine: </span>
            {loggedUser.vaccination_status===true ? (
              <div className="flex flex-col">
                <span>Type: {loggedUser.vaccine_type}</span>
                <span>Dose: {loggedUser.vaccine_dose}</span>
                <span>Date: {loggedUser.vaccine_date}</span>
              </div>
            ) : (
              <span className="text-red-500 font-bold">Not vaccined</span>
            )}
          </span>
        </div>
        <div className="m-10 flex flex-col">
          <button
            onClick={onClick}
            className="flex items-center justify-center p-5   rounded-full  p-2 bg-yellow-200 opacity-80 hover:opacity-100 hover:bg-yellow-300"
          >
            <Tooltip content="Edit Profile Info">
              <img src={profile} alt="" className="w-56" />
            </Tooltip>
          </button>
        </div>
        <React.Fragment>
          <Modal
            show={modal}
            size="lg"
            popup={true}
            onClose={onClose}
            className="bg-gray-600"
          >
            <Modal.Header className="bg-blue-400 opacity-90" />
            <Modal.Body className="bg-blue-400 opacity-90">
              <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 flex flex-col items-center ">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Edit my information
                </h3>
                <div className=" rounded-lg flex flex-col ">
                  <form
                    action=""
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col w-96 gap-2 items-center"
                  >
                    <div className="grid grid-cols-2 items-center justify-center gap-1">
                      <div className="flex flex-col items-center">
                        <label htmlFor="name" className="font-semibold">
                          Name:
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          maxLength={20}
                          placeholder={loggedUser.name}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label htmlFor="last_name" className="font-semibold">
                          Last name:
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          name="last_name"
                          maxLength={20}
                          placeholder={loggedUser.last_name}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label htmlFor="email" className="font-semibold">
                          Email:
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder={loggedUser.email}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label
                          htmlFor="identification"
                          className="font-semibold"
                        >
                          Identification:
                        </label>
                        <input
                          type="text"
                          id="identification"
                          name="identification"
                          maxLength={10}
                          minLength={10}
                          placeholder={loggedUser.identification}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex flex-col items-center">
                        <label htmlFor="phone" className="font-semibold">
                          Phone:
                        </label>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          placeholder={loggedUser.phone || "-"}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label htmlFor="adress" className="font-semibold">
                          Adress:
                        </label>
                        <input
                          type="text"
                          id="adress"
                          name="adress"
                          maxLength={30}
                          minLength={10}
                          placeholder={loggedUser.adress || "-"}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <label htmlFor="birthdate" className="font-semibold">
                          Birth:
                        </label>
                        <input
                          type="date"
                          id="birthdate"
                          name="birthdate"
                          placeholder={loggedUser.birthdate || "-"}
                          className="rounded-lg shadow-lg w-32 h-8"
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                    <hr className=" w-full flex   border-black" />
                    <h5 className="font-bold">Vaccination Status</h5>
                    <div className="flex items-center">
                      <label for="notvaccined" className=" font-semibold p-2">
                        Not Vaccined
                      </label>
                      <input
                        type="radio"
                        id="notvaccined"
                        name="notvaccined"
                        value="notvaccined"
                        checked={status === false ? true : false}
                        onChange={vaccination}
                      />

                      <br />
                      <label for="vaccined" className="font-semibold p-2">
                        Vaccined
                      </label>
                      <input
                        type="radio"
                        id="vaccined"
                        name="vaccined"
                        value="vaccined"
                        checked={status}
                        onChange={vaccination}
                      />

                      <br />
                    </div>
                    <div>
                      {status === true ? (
                        <div>
                          <div className="flex items-center">
                            <label className="font-semibold">
                              Vaccine Type:
                            </label>
                            <select
                              name="type"
                              className="rounded-lg h-10 shadow-lg"
                              onChange={(e) =>
                                setVaccines({
                                  ...vaccines,
                                  type: e.target.value,
                                })
                              }
                            >
                              <option value="Sputnik">Select Type</option>
                              <option value="Sputnik">Sputnik</option>
                              <option value="AstraZeneca">AstraZeneca</option>
                              <option value="Pfizer">Pfizer</option>
                              <option value="Jhonson&Jhonson">
                                Jhonson&Jhonson
                              </option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <label className="font-semibold">
                              Vaccine Dose:
                            </label>
                            <select
                              name="dose"
                              className="rounded-lg shadow-lg"
                              onChange={(e) =>
                                setVaccines({
                                  ...vaccines,
                                  dose: e.target.value,
                                })
                              }
                            >
                              <option value="1">Select Dose</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>
                          <div className="flex  items-center">
                            <label
                              htmlFor="birthdate"
                              className="font-semibold"
                            >
                              Vaccination Date:
                            </label>
                            <input
                              type="date"
                              id="vaccinationdate"
                              name="vaccinationdate"
                              // placeholder={loggedUser.birthdate || "-"}
                              className="rounded-lg shadow-lg w-32 h-8"
                              onChange={(e) =>
                                setVaccines({
                                  ...vaccines,
                                  date: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      ) : (
                        false
                      )}
                    </div>
                    <button className="bg-green-600 opacity-90 hover:bg-green-500 hover:opacity-100 shadow-lg rounded-lg w-24 text-white h-14">
                      Confirm
                    </button>
                  </form>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </React.Fragment>
      </div>
    </div>
  );
}

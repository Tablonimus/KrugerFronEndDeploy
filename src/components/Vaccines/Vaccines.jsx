import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Vaccines() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  if (!loggedUser) navigate("/");


  console.log(loggedUser);
  return <div className="w-full h-screen flex flex-col items-center justify-center">

    {loggedUser?.vaccination_status === false? "No vaccination register, please add info":"vacunas agregadas"}





  </div>;
}

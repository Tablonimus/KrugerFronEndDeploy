import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmployees } from "../../redux/actions";
import NavBar from "../Bars/NavBar";
import AdminBar from "../Bars/AdminBar";
import Employee from "./Employee";
import { useNavigate } from "react-router-dom";
import Filters from "../Bars/Filters";

export default function Employees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  if (!loggedUser) navigate("/");

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  const employees = useSelector((state) => state.employees);

  return (
    <div className="flex flex-col w-full h-screen items-center">
      <NavBar />

      <Filters />

      <div className="w-1/2 flex flex-col  items-center justify-center p-24 gap-5">
        {employees?.length > 0
          ? employees?.map((employee) => {
              return (
                <Employee
                  key={employee.identification}
                  id={employee.id}
                  adress={employee.adress}
                  birthdate={employee.birthdate}
                  email={employee.email}
                  identification={employee.identification}
                  last_name={employee.last_name}
                  name={employee.name}
                  phone={employee.phone}
                  vaccination_status={employee.vaccination_status}
                  vaccine_date={employee.vaccine_date}
                  vaccine_dose={employee.vaccine_dose}
                  vaccine_type={employee.vaccine_type}
                />
              );
            })
          : false}
      </div>

      {loggedUser?.admin === true ? <AdminBar /> : false}
    </div>
  );
}

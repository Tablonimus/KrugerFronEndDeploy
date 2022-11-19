import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import NavBar from "../Bars/NavBar";
import { useDispatch, useSelector } from "react-redux";
import AdminBar from "../Bars/AdminBar";
import "./Home.css";

import vac from "../../assets/images/vac.png";
import { getUserProfile } from "../../redux/actions";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const loggedUser = useSelector((state) => state.loggedUser);
  useEffect(() => {
    dispatch(getUserProfile(id));
    if (!loggedUser) window.location.reload(true);
    // if (!loggedUser) navigate("/");
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="lg:text-5xl text-4xl mt-10 lg:p-10 w-screen flex justify-center items-center font-sans italic">
        "Bienvenido {loggedUser.name}"
      </h1>
      {/* <div className="flex items-center justify-center p-10">


</div> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 border-y p-5">
            <div className="featuredPropBox">
              <ul>
                <li>
                  {" "}
                  <Link to="/home">
                    {/* <a href="#"> */}
                    <div className="fplogo">
                      <h5 className="text-white font-bold">
                        {" "}
                        Vaccination Centers
                      </h5>
                      {/* <img src={vac} alt="fp1" className="w-96 h-" /> */}
                    </div>
                    <div className="fptext">
                      <p className="italic">
                        Find the closest vaccination centers around your city.
                      </p>
                    </div>
                    {/* </a>{" "} */}
                  </Link>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <div className="fplogo">
                      <h5 className="text-white font-bold"> Detailed Info </h5>
                      {/* <img src="https://i.ibb.co/3MZXqZC/logo.png" alt="fp2" /> */}
                    </div>
                    <div className="fptext">
                      <p>
                        Read more about personal care and hygiene techniques
                      </p>
                    </div>
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <div className="fplogo">
                      <h5 className="text-white font-bold"> Safe Travel </h5>
                    </div>
                    <div className="fptext">
                      <p>Know the pandemic status of each country</p>
                    </div>
                  </a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {loggedUser?.admin === true ? <AdminBar /> : false}
    </div>
  );
}

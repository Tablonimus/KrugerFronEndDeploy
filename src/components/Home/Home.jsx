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
const dispatch=useDispatch()
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  const loggedUser = useSelector((state) => state.loggedUser);
  useEffect(() => {
    dispatch(getUserProfile(id));
    if (!loggedUser) navigate("/");

  }, []);
  

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="lg:text-5xl text-4xl mt-10 lg:p-10 w-screen flex justify-center items-center font-sans italic">"Bienvenido {loggedUser.name}"</h1>
{/* <div className="flex items-center justify-center p-10">


</div> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12 border-y p-5">
            <div className="featuredPropBox">
              <ul>
                <li>
                  {" "}
                  <Link to="/vaccines">
                    {/* <a href="#"> */}
                    <div className="fplogo">
                      <img src={vac} alt="fp1" className="w-96 h-" />
                    </div>
                    <div className="fptext">
                      <p className="italic">
                        Register your vaccinations against covid 19
                      </p>
                    </div>
                    {/* </a>{" "} */}
                  </Link>
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <div className="fplogo">
                      <img src="https://i.ibb.co/3MZXqZC/logo.png" alt="fp2" />
                    </div>
                    <div className="fptext">
                      <p>
                        Dummy text is also used to demonstrate the appearance of
                        different typefaces and layouts, and in general the
                        content of dummy text is nonsensical.
                      </p>
                    </div>
                  </a>{" "}
                </li>
                <li>
                  {" "}
                  <a href="#">
                    <div className="fplogo">
                      <img src="https://i.ibb.co/3MZXqZC/logo.png" alt="fp3" />
                    </div>
                    <div className="fptext">
                      <p>
                        Dummy text is also used to demonstrate the appearance of
                        different typefaces and layouts, and in general the
                        content of dummy text is nonsensical.
                      </p>
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

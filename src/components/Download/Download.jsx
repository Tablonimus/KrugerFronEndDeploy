import React from "react";
import NavBar from "../Bars/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PWAPrompt from "react-ios-pwa-prompt";
import { usePWAInstall } from "react-use-pwa-install";

export default function Download() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  if (!loggedUser) navigate("/");

  const install = usePWAInstall();


  return (
    <div className="flex flex-col justify-between h-screen w-full items-center">
      <NavBar />
      <PWAPrompt
        promptOnVisit={1}
        timesToShow={3}
        copyShareButtonLabel="1) Presiona el botón compartir en la esquina superior derecha ↑."
        copyAddHomeButtonLabel="2) Presiona para descargar."
        copyClosePrompt="Mas Tarde"
        copyTitle="Descargar APP"
        copyBody="Agrega Covid Kruger al menú principal."
        permanentlyHideOnDismiss={false}
      />


      <div className="bg-[#14ABD5] justify-between mt-24 rounded-lg flex flex-col items-center">
     
        {!install ? (
          <div className="flex flex-col items-center rounded-lg bg-gray-300 w-96 h-56 m-5 p-5 border justify-center opacity-80 shadow-lg">
            <h1 className="text-black font-bold items-center justify-center">
              {" "}
           The app is already Installed
            </h1>

            <Link to="/home">
              <button className="p-5 font-bold bg-[#14ABD5] rounded-lg shadow-lg">
                Back to Home
              </button>
            </Link>
          </div>
        ) : (
          install && (
            <div className="flex flex-col items-center rounded-lg bg-gray-300 w-96 h-56 m-5 p-5 border justify-center opacity-80 shadow-lg">
              <h1 className="text-black font-bold items-center justify-center">
                {" "}
                Welcome to Covid Kruger.
              </h1>
              <button
                className="p-5 font-bold bg-[#14ABD5] rounded-lg shadow-lg"
                onClick={install}
              >
                Download App
              </button>
            </div>
          )
        )}{" "}
      </div>
      
    </div>
  );
}

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filter, getAllEmployees, orderByDate } from "../../redux/actions";
import search from "../../assets/images/search.png";
import refresh from "../../assets/images/refresh.png";
import filt from "../../assets/images/filter.png";

export default function Filters() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.employees);
  // console.log("filtereee",users);

  const [status, setStatus] = useState({
    type: "",
    dose: "",
    preDate: undefined,
    postDate: undefined,
  });

  // console.log(status);
  // dispatch(filter(status));
  function changeHandler({ target: { name, value } }) {
    setStatus({ ...status, [name]: value });
  }

  async function searchHanlder(e) {
    e.preventDefault();
    dispatch(filter(status));
  }
  function dateHandler(e) {
    e.preventDefault();
    dispatch(orderByDate(status));
  }

  function resetHandler(e) {
    window.location.reload(true);
  }

  return (
    <div className="w-56 lg:w-96 h-full bg-gray-200 pt-20 px-2 fixed left-0 opacity-100 items-center z-20">
      <div className="flex items-center flex-col m-2">
        <label className="font-semibold">Vaccine Dose:</label>
        <select
          name="dose"
          className="rounded-lg shadow-lg"
          // onChange={(e) =>
          //   setStatus({
          //     ...status,
          //     dose: e.target.value,
          //   })
          // }
          onChange={(e) => changeHandler(e)}
        >
          <option value="">Select Dose</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="flex flex-col m-2 items-center">
        <label className="font-semibold">Vaccine Type:</label>
        <select
          name="type"
          className="rounded-lg shadow-lg"
          // onChange={(e) =>
          //   setStatus({
          //     ...status,
          //     type: e.target.value,
          //   })
          // }
          onChange={(e) => changeHandler(e)}
        >
          <option value="">Select Type</option>
          <option value="Sputnik">Sputnik</option>
          <option value="AstraZeneca">AstraZeneca</option>
          <option value="Pfizer">Pfizer</option>
          <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
        </select>
      </div>
     
        <div className="flex items-center justify-center w-full border-b border-black">
          <button
            onClick={(e) => searchHanlder(e)}
            className="bg-blue-400 flex items-center justify-center font-semibold rounded-lg border shadow-lg w-24 h-10 p-2 m-2 hover:bg-gray-600"
          >
            <img src={search} alt="" className="w-6" />
            Search
          </button>
         
        </div>
      <div className="flex items-center flex-col m-2">
        <label className="font-semibold">Vaccination Date:</label>
        <section>
          <span>From:</span>
          <input
            type="date"
            name="predate"
            className="rounded-lg shadow-lg"
            onChange={(e) =>
              setStatus({
                ...status,
                preDate: e.target.value,
              })
            }
          />
        </section>
        <section>
          <span>To:</span>
          <input
            type="date"
            name="postdate"
            className="rounded-lg shadow-lg"
            onChange={(e) =>
              setStatus({
                ...status,
                postDate: e.target.value,
              })
            }
          />
        </section>
        <button
            onClick={(e) => dateHandler(e)}
            className="bg-blue-400 flex items-center justify-center font-semibold rounded-lg border shadow-lg w-48 h-10 p-2 m-2 hover:bg-gray-600"
          >
            <img src={filt} alt="" className="w-6" />
            Filter by date
          </button>
      </div>
      <div className="flex items-center justify-center border-b border-black py-3">

          <button
            onClick={(e) => resetHandler(e)}
            className="bg-amber-400 flex items-center justify-center font-semibold rounded-lg border shadow-lg w-48 h-10 p-2 hover:bg-gray-600"
          >
            <img src={refresh} alt="" className="w-6" />
            Refresh filters
          </button>

      </div>
    </div>
  );
}

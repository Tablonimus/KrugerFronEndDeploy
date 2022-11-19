import * as action from "../actions/actionTypes";
import axios from "axios";
import { setAuthToken } from "../../components/BrowserHistory/setAuthToken";

const urldeploy = "https://krugerback.up.railway.app/";
//-----------Filters--------------
export function filter(payload) {
  return async function (dispatch) {
    try {
      // let json = await axios.get("http://localhost:3001/user/employees");
      let json = await axios.get(`${urldeploy}user/employees`);

      if (payload.type.length > 1 && payload.dose.length > 0) {
        let filtered = json.data.filter(
          (employee) =>
            employee.vaccine_type === payload.type &&
            employee.vaccine_dose === payload.dose
        );

        if (filtered.length) {
          return dispatch({
            type: action.FILTERS,
            payload: filtered,
          });
        } else {
          return alert("No matched data"), getAllEmployees();
        }
      }
      if (payload.type.length >= 1 && !payload.dose.length >= 1) {
        let filtered = json.data.filter(
          (employee) => employee.vaccine_type === payload.type
        );

        if (filtered.length) {
          return dispatch({
            type: action.GET_ALL_EMPLOYEES,
            payload: filtered,
          });
        } else {
          return alert("No data found");
        }
      }
      if (!payload.type.length >= 1 && payload.dose.length >= 1) {
        let filtered = json.data.filter(
          (employee) => employee.vaccine_dose === payload.dose
        );

        if (filtered.length) {
          return dispatch({
            type: action.GET_ALL_EMPLOYEES,
            payload: filtered,
          });
        } else {
          return alert("No data found");
        }
      }
    } catch (error) {
      return "Server Error, try again later";
    }
  };
}

export function orderByDate(payload) {
  if (payload.preDate === undefined || payload.postDate === undefined) {
    return alert("Undefined dates");
  }
  return {
    type: action.ORDER_BY_DATE,
    payload,
  };
}

//----------Login----------------
export function login(payload) {
  return async function (dispatch) {
    try {
      console.log("payload", payload);
      await axios.post(`${urldeploy}user/login`, payload).then((response) => {
        const token = response.data.data.token;
        const id = response.data.id.id;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        setAuthToken(token);
      });
      return dispatch({
        type: action.LOGIN,
        payload,
      });
    } catch (error) {
      return dispatch({
        type: action.LOGIN,
        payload: error.response.data,
      });
    }
  };
}
//-----------Get User Profile-----
export function getUserProfile(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${urldeploy}user/${id}`);
      return dispatch({
        type: action.GET_USER_PROFILE,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
//------------GET ALL------------
export function getAllEmployees() {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${urldeploy}user/employees`);
      dispatch({
        type: action.GET_ALL_EMPLOYEES,
        payload: json.data,
      });

      return "Success";
    } catch (error) {
      return "Server Error, try again later";
    }
  };
}
//-----------Create User---------
export function createUser(payload) {
  return async function (dispatch) {
    try {
      // let verify = await axios.get("http://localhost:3001/user/employees");

      // let verifyed = verify.filter( (user)=> user.identification === payload.identification)

      // if(verifyed.length) return alert("Identification already exists")
      let json = await axios.post(`${urldeploy}user/create`, payload);

      dispatch({
        type: action.CREATE_USER,
        payload: json.data,
      });

      return alert("Employee created successfully");
    } catch (error) {
      return "Server Error, try again later";
    }
  };
}
//-----------Edit User-----------
export function patchUser(payload) {
  return async function (dispatch) {
    console.log("payload", payload);
    try {
      let json = await axios.patch(`${urldeploy}user/edit`, payload);

      dispatch({
        type: action.PATCH_USER,
        payload: json.data,
      });

      return "Edited";
    } catch (error) {
      return "Server Error, try again later";
    }
  };
}
//-----------Logout--------------
export function logout() {
  return async function (dispatch) {
    try {
      dispatch({
        type: action.CLEAR_STATE,
      });

      return "loged out";
    } catch (error) {
      return "Server Error, try again later";
    }
  };
}

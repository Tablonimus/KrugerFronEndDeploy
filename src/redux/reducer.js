import * as action from "../redux/actions/actionTypes";
import moment from "moment";

const initialState = {
  loggedUser: {},
  employees: [],
  copyEmployees: [],
};

export default function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case action.LOGIN: {
      return {
        ...state,
      };
    }
    case action.GET_USER_PROFILE: {
      return {
        ...state,
        loggedUser: payload,
      };
    }

    case action.GET_ALL_EMPLOYEES: {
      return {
        ...state,
        employees: payload,
        copyEmployees: payload,
      };
    }

    case action.CREATE_USER: {
      return {
        ...state,
      };
    }
    case action.PATCH_USER: {
      return {
        ...state,
      };
    }

    case action.CLEAR_STATE: {
      return {
        ...state,
        loggedUser: {},
      };
    }
    case action.FILTERS: {
      return {
        ...state,
        employees: payload,
        copyEmployees: payload,
      };
    }
    case action.ORDER_BY_DATE: {
      const allemployees = state.copyEmployees;
      // console.log("aca");
      // if (payload.preDate === undefined || payload.postDate === undefined) {
      //   return { ...state ,employees:state.copyEmployees};
      // }
      if (payload.preDate !== undefined && payload.postDate !== undefined) {
        const filteredEmployees = allemployees.filter((employee) =>
          moment(employee.vaccine_date).isBetween(
            payload.preDate,
            payload.postDate
          )
        );
        return {
          ...state,
          employees: filteredEmployees,
        };
      } else
        return {
          ...state,
        };
    }

    default:
      return state;
  }
}

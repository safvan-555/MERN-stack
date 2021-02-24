import axios from "axios";
import { toast } from "react-toastify";

const SET_EMPLOY_DATA = "SET_EMPLOY_DATA"
const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function setEmployData(name, value) {
  return {
    type: SET_EMPLOY_DATA,
    payload: { [name]: value },
  };
}
export function registerUser(userData) {
  return function (dispatch) {
    return axios.post("/api/customers/sign-up", userData)
      .then(({ data }) => {
        if (data.error) {
          toast.warn(data.error_description)
        } else {
          toast.success("Registered successfully")
          setTimeout(() => {
            window.location.href = '/sign-in'
          }, 1000)
        }
      }).catch(err => {
        toast.warn(err.error_description)
      })
  };
}
export function Reset_Password(userData) {
  return function (dispatch) {
    return axios.post("/api/customers/reset-password", userData)
      .then(({ data }) => {
        if (data.error) {
          toast.warn(data.error_description)
        } else {
          toast.success("Password changes successfully")

        }
      }).catch(err => {
        toast.warn(err.error_description)
      })
  };
}

export function SendInstruction(userData) {
  return function (dispatch) {
    return axios.post("/api/customers/send-instruction", userData)
      .then(({ data }) => {
        if (data.error) {
          toast.warn(data.error_description)
        } else {
          toast.success("Instruction successfully sent to your mail.")

        }
      }).catch(err => {
        toast.warn(err.error_description)
      })
  };
}

export function Login(userData) {
  return function (dispatch) {
    return axios.post("/api/auth/login", userData)
      .then(({ data }) => {
        if (data.error) {
          toast.warn(data.error_description)
        } else {
          // Save to localStorage
          // Set token to localStorage
          const { accessToken } = data;
          localStorage.setItem("jwtToken", accessToken);
          // Set token to Auth header
          setAuthToken(accessToken);
          // Set current user as authenticated
          dispatch(setEmployData('redirect', '/'))
          dispatch(setEmployData('auth', true));
          toast.success("Logged")

        }
      }).catch(err => {
        toast.warn(err.error_description)
      })
  };
}

// Log user out

export function logoutUser(userData) {
  return function (dispatch) {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch({
      type: SET_EMPLOY_DATA, payload: { auth: false }
    });
  }
}

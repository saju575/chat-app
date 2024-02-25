/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { SET_LOADING, SET_USER } from "../constant/constant";
import axios from "../utils/lib/axios-instance";

const initialState = {
  user: null,
  isLoading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/customer-support/agent/profile");
      dispatch({ type: "SET_USER", payload: response.data.payload });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

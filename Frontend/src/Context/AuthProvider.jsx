import React,  { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const initialUserState = sessionStorage.getItem("Blood Donor");

  // parse the user data and storing in state.
  const [authUser, setAuthUser] = useState( initialUserState ? JSON.parse(initialUserState) : undefined);
  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
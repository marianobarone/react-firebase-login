import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";

export const Auth = React.createContext();

export const AuthContext = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged(setUsuario);
  }, []);

  return (
    <Auth.Provider value={{ usuario, productos}}>{children}</Auth.Provider>
  );
};
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [waitUser, setWaitUser] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (localStorage.getItem("token")) {
          await getuser();
        }
      } catch (err) {
        console.log(err);
      } finally {
        setWaitUser(false);
      }
    };
    fetchMe();
  }, []);

  const getuser = async () => {
    const res = await axios.get("http://localhost:3001/auth/getuser", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(res.data.user);
  };
  const register = async (input) => {
    const res = await axios.post("http://localhost:3001/auth/register", input);
    localStorage.setItem("token", res.data.token);
  };
  const login = async (input) => {
    const res = await axios.post("http://localhost:3001/auth/login", input);
    localStorage.setItem("token", res.data.token);

    return res;
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        waitUser,
        register,
        login,
        logout,
        getuser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (localStorage.getItem("token")) {
          await getuser();
        }
      } catch (error) {}
    };
    fetchUser();
  }, []);

  const getuser = async () => {
    const res = await axios.get("http://localhost:3001/auth/getuser", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setUser(res.data.user);
  };

  const login = async (input) => {
    try {
      const res = await axios.post("http://localhost:3001/auth/login", input);
      localStorage.setItem("token", res.data.token);
      await getuser();
    } catch (err) {
      return err;
    }
  };

  const register = async (input) => {
    const res = axios.post("http://localhost:3001/auth/register", input);
    localStorage.setItem("token", res.data.token);
    await getuser();
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        getuser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };

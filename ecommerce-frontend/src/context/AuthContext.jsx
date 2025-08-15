import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async ({ email, password }) => {
    const { data } = await axios.post("https://YOUR_BACKEND_URL/api/auth/login", { email, password });
    setUser(data);
  };

  const register = async ({ name, email, password }) => {
    const { data } = await axios.post("https://YOUR_BACKEND_URL/api/auth/register", { name, email, password });
    setUser(data);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

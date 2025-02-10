// frontend/src/context/AuthContext.tsx

"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

interface User {
  id: number;
  email: string;
  name: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// Custom hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for token in localStorage on initial load
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Optionally, verify the token's validity here
        setIsAuthenticated(true);
        // Fetch user profile from backend
        fetchUserProfile(token);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("User not logged in.");
      }

      const data = await res.json();
      //console.log("Fetched user data:", data);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    fetchUserProfile(token);
  };

  const logout = async () => {
    try {
      // Optionally, notify the backend about logout to invalidate tokens/sessions
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Include cookies if using them
      });
    } catch (error) {
      console.error("Error during logout:", error);
      // Even if logout fails, proceed to clear client-side auth state
    }
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

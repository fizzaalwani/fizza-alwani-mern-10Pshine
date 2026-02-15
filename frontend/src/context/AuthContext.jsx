// import { createContext, useContext, useEffect, useState } from "react";
// import API from "../services/api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = localStorage.getItem("accessToken");
      
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await API.get('/user/');
        
//         if (response.data.success) {
//           setUser(response.data.user);
//           console.log(response.data.user)
//         }
//       } catch (err) {
//         console.log("Failed to fetch user profile:", err);
//         // If token is invalid, remove it
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []); // Empty dependency array - only run once on mount

//   const login = async (email, password) => {
//     try {
//       const response = await API.post('/auth/login', { email, password });
      
//       if (response.data.success) {
//         localStorage.setItem("accessToken", response.data.accessToken);
//         if (response.data.refreshToken) {
//           localStorage.setItem("refreshToken", response.data.refreshToken);
//         }
//         setUser(response.data.user);
//         return { success: true };
//       }
      
//       return { success: false, message: response.data.message };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || "Login failed" 
//       };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const response = await API.post('/auth/register', { name, email, password });
      
//       if (response.data.success) {
//         localStorage.setItem("accessToken", response.data.accessToken);
//         if (response.data.refreshToken) {
//           localStorage.setItem("refreshToken", response.data.refreshToken);
//         }
//         setUser(response.data.user);
//         return { success: true };
//       }
      
//       return { success: false, message: response.data.message };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || "Registration failed" 
//       };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//   };

//   const updateProfile = async (updates) => {
//     try {
//       const response = await API.post('/user/update', updates);
      
//       if (response.data.success) {
//         setUser({ ...user, ...updates });
//         return { success: true, message: response.data.message };
//       }
      
//       return { success: false, message: response.data.message };
//     } catch (err) {
//       return { 
//         success: false, 
//         message: err.response?.data?.message || "Update failed" 
//       };
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       setUser, 
//       loading, 
//       login,
//       register,
//       logout,
//       updateProfile 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track auth loading


   const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/user/");
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log("Failed to fetch user profile:", err);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  // Fetch user on mount if token exists
  useEffect(() => {

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", { email, password });

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await API.post("/auth/register", { name, email, password });

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem("refreshToken", response.data.refreshToken);
        }
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, message: response.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  const updateProfile = async (updates) => {
    try {
      const response = await API.post("/user/update", updates);

      if (response.data.success) {
        // Only merge fields that exist on user object
        const { name, email } = updates;
        setUser((prev) => ({
          ...prev,
          name: name ?? prev.name,
          email: email ?? prev.email,
        }));
        return { success: true, message: response.data.message };
      }

      return { success: false, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Update failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading, // Track loading for components
        login,
        register,
        logout,
        fetchUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";

// Create the CurrentUserContext and SetCurrentUserContext contexts
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks to access the current user and set current user contexts
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Function to fetch the current user on mount
  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);
  // Configure interceptors for axios requests and responses
  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          // Send a request to refresh the token
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          // If token refresh fails, set current user to null and redirect to sign in page
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            // Send a request to refresh the token
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            // If token refresh fails, set current user to null and redirect to sign in page
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  // Provide the current user and set current user contexts to child components
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

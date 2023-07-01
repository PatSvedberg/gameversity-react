import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
  const history = useHistory();

  useEffect(() => {
    const handleMount = async () => {
      try {
        // Send a request to refresh the token
        await axios.post("/dj-rest-auth/token/refresh/");
        // If the user is logged in, redirect to the home page
        if (userAuthStatus === "loggedIn") {
          history.push("/");
        }
      } catch (err) {
        // If the user is not logged in, redirect to the home page
        if (userAuthStatus === "loggedOut") {
          history.push("/");
        }
      }
    };

    // Call the handleMount function when the component mounts
    handleMount();
  }, [history, userAuthStatus]);
};

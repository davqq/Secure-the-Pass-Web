import { useEffect } from "react";

const logout = () => {
  useEffect(() => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace("/login"); // Redirect to the login page
  }, []);
  return null; // This component doesn't render anything
};

export default logout;

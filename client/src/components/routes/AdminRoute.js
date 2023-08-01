import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function AdminRoute() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [ok, setOk] = useState(null); // Initialize to null for loading state

  useEffect(() => {
    const adminCheck = async () => {
      try {
        const { data } = await axios.get(`/admin-check`);
        if (data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (err) {
        // Handle the error here
        console.log(err);
        setOk(false);
      }
    };

    if (auth?.token) {
      adminCheck();
    } else {
      // If there's no token, setOk to false to prevent unauthorized access
      setOk(false);
    }
  }, [auth?.token]);

  // Handle the initial loading state (ok === null)
  if (ok === null) {
    return <Loading path="" />;
  }

  return ok ? <Outlet /> : <Loading path="" />;
}

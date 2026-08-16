import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setAllUsers, setAllComponents } from "./redux/userSlice";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AllComponents from "./pages/AllComponents";
import MyComponents from "./pages/MyComponents";
import Pricing from "./pages/Pricing";

export const ServerUrl = "https://bitsnipai.onrender.com";

function App() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [authChecked, setAuthChecked] = useState(false);

  // Fetch current authenticated user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          ServerUrl + "/api/user/current-user",
          {
            withCredentials: true,
          }
        );

        dispatch(setUserData(res.data));
      } catch (error) {
        dispatch(setUserData(null));
      } finally {
        setAuthChecked(true);
      }
    };

    fetchUser();
  }, [dispatch]);

  // Fetch all users & components when userData is available
  useEffect(() => {
    if (!userData) return;

    // Fetch all users (admin only)
    const fetchAllUsers = async () => {
      try {
        const usersRes = await axios.get(ServerUrl + "/api/user/all-users", {
          withCredentials: true,
        });
        dispatch(setAllUsers(usersRes.data));
      } catch (error) {
        dispatch(setAllUsers(null));
      }
    };

    // Fetch all components
    const fetchAllComponents = async () => {
      try {
        const componentsRes = await axios.get(
          ServerUrl + "/api/component/all-components",
          { withCredentials: true }
        );
        dispatch(setAllComponents(componentsRes.data));
      } catch (error) {
        dispatch(setAllComponents(null));
      }
    };

    // Only fetch all users if this is the admin — avoids a needless 403 for regular users
    if (userData.email === import.meta.env.VITE_ADMIN_EMAIL) {
      fetchAllUsers();
    }
    fetchAllComponents();
  }, [userData, dispatch]);

  return (
    <>
      {!authChecked && (
        <div className="fixed top-0 left-0 w-full h-1 bg-purple-500 animate-pulse z-50"></div>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route
          path="/admin"
          element={
            <AdminRoute authChecked={authChecked}>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/components" element={<AllComponents />} />
        <Route path="/my-components" element={<MyComponents />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  );
}

export default App;

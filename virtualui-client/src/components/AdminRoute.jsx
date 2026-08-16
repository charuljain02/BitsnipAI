import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

const AdminRoute = ({ children, authChecked }) => {
  const { userData } = useSelector((state) => state.user);

  // Auth check (current-user API call) hasn't finished yet -> don't decide anything,
  // otherwise userData is still null on first render and we'd redirect wrongly.
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030b0d] text-white/40 text-sm">
        Checking access...
      </div>
    );
  }

  // Not logged in at all -> send to login/home
  if (!userData) {
    return <Navigate to="/" replace />;
  }

  // Logged in but not the admin email -> block access
  if (userData.email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
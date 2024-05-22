import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = (props) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);

  if (loading) {
    // Display a loader while loading
    return <Loader />;
  }else{
    
    if (props.isAdmin===false&&!isAuthenticated) {
      console.log("Redirect to the login page if the user is not authenticated");
      return <Navigate to="/login" />;
    }
    if (props.isAdmin===true && isAuthenticated && user.role !== 'admin') {
      console.log("Redirect to the admin dashboard if the user is an admin",user.role);
      return <Navigate to="/login" />;
    }
    
    console.log("If none of the above conditions are met, render the child components");
    return <Outlet />;
  }
};

export default ProtectedRoute;

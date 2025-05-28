import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

    // If the user is logged in, render the child components
    // If not, redirect them to the login page
    return isLoggedIn === "true" ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
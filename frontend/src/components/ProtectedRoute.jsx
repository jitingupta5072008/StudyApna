import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // Retrieve JWT from localStorage

    if (!token) {
        // If no token, redirect to login page
        return <Navigate to="/login" replace />;
    }

    return children; // Render protected component
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RecruiterRoute({ children }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "RECRUITER") {
        return <Navigate to="/" replace />;
    }

    return children;
}
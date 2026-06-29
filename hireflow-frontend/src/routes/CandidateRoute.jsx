import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CandidateRoute({ children }) {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (role !== "CANDIDATE") {
        return <Navigate to="/" replace />;
    }

    return children;
}
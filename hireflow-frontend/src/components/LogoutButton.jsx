import { useNavigate } from "react-router-dom";

export default function LogoutButton() {

    const navigate = useNavigate();

    function handleLogout() {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");

        window.location.reload();
    }

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 rounded-lg transition-all duration-200 cursor-pointer"
        >
            Logout
        </button>
    );
}
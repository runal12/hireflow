import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4">
            <div className="text-center">
                <p className="text-8xl font-extrabold text-primary-600 mb-2">404</p>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h1>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-8 py-3 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-200 hover:shadow-lg transition-all duration-200"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
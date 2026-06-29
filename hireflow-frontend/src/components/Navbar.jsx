import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const { isAuthenticated, role } = useAuth();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    function isActive(path) {
        return location.pathname === path;
    }

    const linkBase = "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200";
    const linkIdle = "text-slate-600 hover:text-primary-600 hover:bg-primary-50";
    const linkActive = "text-primary-600 bg-primary-50";

    function navLinkClass(path) {
        return `${linkBase} ${isActive(path) ? linkActive : linkIdle}`;
    }

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md shadow-primary-200 group-hover:shadow-lg group-hover:shadow-primary-300 transition-all duration-300">
                            <span className="text-white font-bold text-sm">H</span>
                        </div>
                        <span className="text-xl font-bold text-slate-800 group-hover:text-primary-600 transition-colors duration-200">
                            HireFlow
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link to="/" className={navLinkClass("/")}>Home</Link>
                        <Link to="/jobs" className={navLinkClass("/jobs")}>Jobs</Link>

                        {isAuthenticated ? (
                            <>
                                {/* Candidate */}
                                {role === "CANDIDATE" && (
                                    <Link
                                        to="/applications"
                                        className={navLinkClass("/applications")}
                                    >
                                        My Applications
                                    </Link>
                                )}

                                {/* Recruiter */}
                                {role === "RECRUITER" && (
                                    <>
                                        <Link
                                            to="/my-jobs"
                                            className={navLinkClass("/my-jobs")}
                                        >
                                            My Jobs
                                        </Link>

                                        <Link
                                            to="/create-job"
                                            className={navLinkClass("/create-job")}
                                        >
                                            Create Job
                                        </Link>
                                    </>
                                )}

                                {/* Everyone */}
                                <Link to="/profile" className={navLinkClass("/profile")}>
                                    Profile
                                </Link>

                                <div className="ml-2 pl-2 border-l border-slate-200">
                                    <LogoutButton />
                                </div>
                            </>
                        ) : (
                            <div className="ml-2 pl-2 border-l border-slate-200 flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-md shadow-primary-200 hover:shadow-lg hover:shadow-primary-300 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pb-4 pt-2 space-y-1 bg-white border-t border-slate-100">
                    <Link to="/" onClick={() => setMobileOpen(false)} className={`block ${navLinkClass("/")}`}>Home</Link>
                    <Link to="/jobs" onClick={() => setMobileOpen(false)} className={`block ${navLinkClass("/jobs")}`}>Jobs</Link>

                    {isAuthenticated ? (
                        <>
                            {role === "CANDIDATE" && (
                                <Link
                                    to="/applications"
                                    onClick={() => setMobileOpen(false)}
                                    className={`block ${navLinkClass("/applications")}`}
                                >
                                    My Applications
                                </Link>
                            )}

                            {role === "RECRUITER" && (
                                <>
                                    <Link
                                        to="/my-jobs"
                                        onClick={() => setMobileOpen(false)}
                                        className={`block ${navLinkClass("/my-jobs")}`}
                                    >
                                        My Jobs
                                    </Link>

                                    <Link
                                        to="/create-job"
                                        onClick={() => setMobileOpen(false)}
                                        className={`block ${navLinkClass("/create-job")}`}
                                    >
                                        Create Job
                                    </Link>
                                </>
                            )}

                            <Link
                                to="/profile"
                                onClick={() => setMobileOpen(false)}
                                className={`block ${navLinkClass("/profile")}`}
                            >
                                Profile
                            </Link>

                            <div className="pt-2 mt-2 border-t border-slate-100">
                                <LogoutButton />
                            </div>
                        </>
                    ) : (
                        <div className="pt-2 mt-2 border-t border-slate-100 space-y-2">
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="block text-center px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 hover:bg-primary-50 rounded-lg transition-all duration-200"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setMobileOpen(false)}
                                className="block text-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-all duration-200"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
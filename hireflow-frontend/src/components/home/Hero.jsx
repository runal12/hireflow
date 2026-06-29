import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
    const { isAuthenticated } = useAuth();
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-slate-50">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-300/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
                <div className="text-center max-w-3xl mx-auto">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 border border-primary-100 rounded-full text-sm font-medium text-primary-600 mb-6">
                        <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                        #1 Job Portal for Professionals
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        Find Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                            Dream Job
                        </span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                        HireFlow connects talented candidates with top companies.
                        Discover thousands of opportunities and take the next step in your career.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/jobs"
                            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Browse Jobs →
                        </Link>
                        {!isAuthenticated && (
                            <Link
                                to="/register"
                                className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-primary-600 bg-white hover:bg-primary-50 border border-primary-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Create Account
                            </Link>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-800">2K+</p>
                            <p className="text-sm text-slate-500 mt-1">Active Jobs</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-800">500+</p>
                            <p className="text-sm text-slate-500 mt-1">Companies</p>
                        </div>
                        <div>
                            <p className="text-2xl sm:text-3xl font-bold text-slate-800">10K+</p>
                            <p className="text-sm text-slate-500 mt-1">Candidates</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
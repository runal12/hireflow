import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function CTA() {

    const { isAuthenticated } = useAuth();

    return (
        <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    Ready to Start Your Journey?
                </h2>
                <p className="text-lg text-primary-100 max-w-2xl mx-auto mb-8">
                    Join HireFlow today and connect with opportunities that match your ambitions.
                    Your dream career is just a click away.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">


                    {!isAuthenticated && (
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-primary-700 bg-white hover:bg-primary-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Create Account
                        </Link>
                    )}



                    <Link
                        to="/jobs"
                        className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Explore Jobs
                    </Link>
                </div>
            </div>
        </section>
    );
}
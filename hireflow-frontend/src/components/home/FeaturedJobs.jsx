import { Link } from "react-router-dom";

export default function FeaturedJobs() {

    const jobs = [
        { title: "Python Developer", location: "Pune", type: "Full Time" },
        { title: "Frontend Developer", location: "Remote", type: "Remote" },
        { title: "Backend Developer", location: "Bangalore", type: "Full Time" },
    ];

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                            Featured Jobs
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Hand-picked opportunities from top companies
                        </p>
                    </div>
                    <Link
                        to="/jobs"
                        className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
                    >
                        View All Jobs
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>

                {/* Job Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center text-primary-600 font-bold text-lg">
                                    {job.title.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">
                                        {job.title}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {job.location} • {job.type}
                                    </p>
                                </div>
                            </div>
                            <Link to="/jobs">
                                <button className="w-full mt-2 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white rounded-lg border border-primary-100 hover:border-primary-600 transition-all duration-200 cursor-pointer">
                                    View Job →
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
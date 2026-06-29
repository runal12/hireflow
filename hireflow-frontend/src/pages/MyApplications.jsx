import { useEffect, useState } from "react";
import { getMyApplications } from "../api/applications";

export default function Applications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        async function loadApplications() {
            try {
                const data = await getMyApplications();
                setApplications(data);
            } catch (error) {
                console.log(error);
            }
        }
        loadApplications();
    }, []);

    function statusBadge(status) {
        const s = status?.toLowerCase();
        if (s === "accepted") return "bg-green-50 text-green-700 border-green-200";
        if (s === "rejected") return "bg-red-50 text-red-700 border-red-200";
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">My Applications</h1>
                <p className="text-slate-500 mt-2">Track the status of your job applications</p>
            </div>

            {applications.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                    <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                    <h3 className="text-lg font-medium text-slate-600">No applications yet</h3>
                    <p className="text-slate-400 mt-1">Start applying to jobs to see them here</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {applications.map((application) => (
                        <div key={application.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <h3 className="text-lg font-semibold text-slate-800">{application.job_title}</h3>
                                <span className={`shrink-0 text-xs font-medium px-3 py-1 rounded-full border ${statusBadge(application.status)}`}>
                                    {application.status}
                                </span>
                            </div>
                            {application.company && (
                                <p className="text-sm text-slate-500">{application.company}</p>
                            )}
                            {application.applied_date && (
                                <p className="text-xs text-slate-400 mt-3">Applied: {new Date(application.applied_date).toLocaleDateString()}</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJob } from "../api/jobs";
import { applyForJob, checkApplication } from "../api/applications";
import { useAuth } from "../context/AuthContext";


export default function JobDetails() {

    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const { isAuthenticated, role } = useAuth();
    

    useEffect(() => {

        async function loadData() {

            try {

                const data = await getJob(id);
                setJob(data);

                if (isAuthenticated && role === "CANDIDATE") {

                    const result = await checkApplication(id);

                    setApplied(result.applied);

                }

            } catch (error) {

                console.log(error);

            }

        }

        loadData();

    }, [id, isAuthenticated, role]);

    async function handleApply() {
        setApplying(true);
        try {
            await applyForJob(job.id);
            setApplied(true);
            alert("Application submitted successfully!");
        } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Failed to apply.");
        } finally {
            setApplying(false);
        }
    }

    if (!job) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-8 text-white">
                    <h1 className="text-3xl font-bold">{job.title}</h1>
                    {job.company && <p className="mt-2 text-primary-100 text-lg">{job.company}</p>}
                </div>

                {/* Details */}
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {job.location && (
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Location</p>
                                    <p className="font-medium text-slate-800">{job.location}</p>
                                </div>
                            </div>
                        )}
                        {job.employment_type && (
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Type</p>
                                    <p className="font-medium text-slate-800">{job.employment_type}</p>
                                </div>
                            </div>
                        )}
                        {(job.salary_min || job.salary_max) && (
                            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500">Salary</p>
                                    <p className="font-medium text-slate-800">₹{job.salary_min} - ₹{job.salary_max}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 mb-3">Job Description</h2>
                        <p className="text-slate-600 leading-relaxed whitespace-pre-line">{job.description}</p>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-4 border-t border-slate-100">

                        {!isAuthenticated ? (

                            <button
                                onClick={() => window.location.href = "/login"}
                                className="w-full sm:w-auto px-8 py-3.5 text-white bg-primary-600 rounded-xl"
                            >
                                Login to Apply
                            </button>

                        ) : role === "CANDIDATE" ? (

                            <button
                                onClick={handleApply}
                                disabled={applied || applying}
                                className={`w-full sm:w-auto px-8 py-3.5 text-base font-semibold rounded-xl transition-all duration-200 ${
                                    applied
                                        ? "bg-green-100 text-green-700 border border-green-200"
                                        : "text-white bg-primary-600 hover:bg-primary-700"
                                }`}
                            >
                                {applied
                                    ? "✓ Applied"
                                    : applying
                                    ? "Submitting..."
                                    : "Apply Now"}
                            </button>

                        ) : (

                            <div className="text-slate-500 font-medium">
                                Recruiters cannot apply for jobs.
                            </div>

                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
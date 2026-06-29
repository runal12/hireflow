import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyJobs, deleteJob } from "../api/jobs";

export default function MyJobs() {
    const [jobs, setJobs] = useState([]);

    async function loadJobs() {
        try {
            const data = await getMyJobs();
            setJobs(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadJobs();
    }, []);

    async function handleDelete(id) {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;
        try {
            await deleteJob(id);
            alert("Job deleted!");
            loadJobs();
        } catch (error) {
            console.log(error.response?.data);
        }
    }       

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Jobs</h1>
                    <p className="text-slate-500 mt-2">Manage your posted positions</p>
                </div>
                <Link to="/create-job" className="px-6 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-200 hover:shadow-lg transition-all duration-200">
                    + Post New Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                    <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    <h3 className="text-lg font-medium text-slate-600">No jobs posted yet</h3>
                    <p className="text-slate-400 mt-1">Create your first job listing</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300">
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">{job.title}</h3>
                            <div className="space-y-1 mb-5">
                                {job.location && <p className="text-sm text-slate-500">📍 {job.location}</p>}
                                {(job.salary_min || job.salary_max) && <p className="text-sm text-slate-500">💰 ₹{job.salary_min} - ₹{job.salary_max}</p>}
                            </div>
                            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                                <Link to={`/jobs/edit/${job.id}`} className="col-span-1 text-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-100 transition-all duration-200">
                                    Edit
                                </Link>
                                <button onClick={() => handleDelete(job.id)} className="col-span-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg border border-red-100 transition-all duration-200 cursor-pointer">
                                    Delete
                                </button>

                                <Link to={`/jobs/${job.id}/applicants`} className="col-span-1 px-4 py-2 text-sm font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
                                    Applicants
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
import { useState } from "react";
import { createJob } from "../api/jobs";

export default function CreateJob() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [employmentType, setEmploymentType] = useState("FULL_TIME");
    const [salaryMin, setSalaryMin] = useState("");
    const [salaryMax, setSalaryMax] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await createJob({
                title,
                company,
                description,
                city: location,
                employment_type: employmentType,
                salary_min: salaryMin !== "" ? Number(salaryMin) : 0,
                salary_max: salaryMax !== "" ? Number(salaryMax) : 0,
                is_active: true,
            });
            alert("Job created successfully!");
        } catch (error) {
            console.log(error.response?.data);
            alert("Failed to create job.");
        } finally {
            setLoading(false);
        }
    }

    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all duration-200";

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 sm:p-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Create New Job</h1>
                    <p className="text-slate-500 mt-1">Fill in the details to post a new position</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title</label>
                        <input placeholder="e.g. Senior React Developer" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                        <input placeholder="e.g. Acme Corp" value={company} onChange={(e) => setCompany(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                        <input placeholder="e.g. Bangalore, Remote" value={location} onChange={(e) => setLocation(e.target.value)} required className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Employment Type</label>
                        <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`}>
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="INTERNSHIP">Internship</option>
                            <option value="CONTRACT">Contract</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Min Salary</label>
                            <input type="number" placeholder="e.g. 500000" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} min="0" max="9999999999" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Max Salary</label>
                            <input type="number" placeholder="e.g. 1200000" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} min="0" max="9999999999" className={inputClass} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
                        <textarea placeholder="Describe the role, responsibilities, and requirements..." value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className={`${inputClass} resize-none`} />
                    </div>
                    <button type="submit" disabled={loading} className="w-full px-6 py-3.5 text-base font-semibold text-white bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 rounded-xl shadow-md shadow-primary-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
                        {loading ? "Creating..." : "Create Job"}
                    </button>
                </form>
            </div>
        </div>
    );
}
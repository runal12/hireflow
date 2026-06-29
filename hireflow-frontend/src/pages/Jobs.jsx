import { useCallback, useEffect, useRef, useState } from "react";
import JobCard from "../components/JobCard";
import { getJobs } from "../api/jobs";

const EMPLOYMENT_TYPES = [
    { value: "",           label: "All Types" },
    { value: "FULL_TIME",  label: "Full Time" },
    { value: "PART_TIME",  label: "Part Time" },
    { value: "INTERNSHIP", label: "Internship" },
    { value: "CONTRACT",   label: "Contract" },
    { value: "REMOTE",     label: "Remote" },
];

const EXPERIENCE_LEVELS = [
    { value: "",       label: "Any Experience" },
    { value: "ENTRY",  label: "0–1 Years" },
    { value: "MID",    label: "1–3 Years" },
    { value: "SENIOR", label: "3–5 Years" },
    { value: "LEAD",   label: "5+ Years" },
];

export default function Jobs() {
    const [jobs, setJobs]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal]     = useState(0);

    // Search & filter state
    const [search,   setSearch]   = useState("");
    const [location, setLocation] = useState("");
    const [type,     setType]     = useState("");
    const [experience, setExperience] = useState("");

    // Debounce timer ref
    const debounceRef = useRef(null);

    const fetchJobs = useCallback(async (params) => {
        setLoading(true);
        try {
            const data = await getJobs(params);
            setJobs(data);
            setTotal(data.length);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Re-fetch whenever filters change (debounced for search text)
    useEffect(() => {
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            const params = {};
            if (search.trim())     params.search     = search.trim();
            if (location.trim())   params.location   = location.trim();
            if (type)              params.type        = type;
            if (experience)        params.experience  = experience;
            fetchJobs(params);
        }, 300);

        return () => clearTimeout(debounceRef.current);
    }, [search, location, type, experience, fetchJobs]);

    function clearFilters() {
        setSearch("");
        setLocation("");
        setType("");
        setExperience("");
    }

    const hasFilters = search || location || type || experience;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

            {/* ── Page Header ── */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Available Jobs</h1>
                <p className="text-slate-500 mt-1 text-sm">
                    {loading ? "Searching…" : `${total} position${total !== 1 ? "s" : ""} found`}
                </p>
            </div>

            {/* ── Search + Filters ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 space-y-4">

                {/* Search bar */}
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by job title, company, or location…"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition"
                    />
                </div>

                {/* Filter row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    {/* Location */}
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="📍 Filter by city…"
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition"
                    />

                    {/* Employment Type */}
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition"
                    >
                        {EMPLOYMENT_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>

                    {/* Experience Level */}
                    <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition"
                    >
                        {EXPERIENCE_LEVELS.map((l) => (
                            <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                    </select>
                </div>

                {/* Clear filters */}
                {hasFilters && (
                    <div className="flex justify-end">
                        <button
                            onClick={clearFilters}
                            className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition"
                        >
                            ✕ Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* ── Results ── */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[40vh]">
                    <div className="animate-spin h-10 w-10 border-4 border-primary-500 border-t-transparent rounded-full" />
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-4xl mb-4">🔍</p>
                    <h2 className="text-xl font-semibold text-slate-800">No jobs found</h2>
                    <p className="text-slate-500 mt-2 text-sm">
                        {hasFilters ? "Try adjusting your search or filters." : "Recruiters haven't posted any jobs yet."}
                    </p>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-sm font-semibold text-primary-600 hover:underline"
                        >
                            Clear all filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            )}

        </div>
    );
}
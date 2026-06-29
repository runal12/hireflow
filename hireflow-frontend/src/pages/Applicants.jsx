import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getApplicants, updateApplicationStatus } from "../api/recruiter";
import { mediaUrl } from "../utils/mediaUrl";

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const styles = {
        PENDING:  "bg-yellow-50 text-yellow-700 border-yellow-200",
        ACCEPTED: "bg-green-50  text-green-700  border-green-200",
        REJECTED: "bg-red-50    text-red-700    border-red-200",
    };
    return (
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border capitalize ${styles[status] || "bg-slate-100 text-slate-600"}`}>
            {status.toLowerCase()}
        </span>
    );
}

// ── Skill badge ───────────────────────────────────────────────────────────────
function SkillBadge({ skill }) {
    return (
        <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
            {skill.trim()}
        </span>
    );
}

// ── Applicant Card ────────────────────────────────────────────────────────────
function ApplicantCard({ application, onStatus }) {
    const {
        id,
        candidate_id,
        candidate_name,
        candidate_first_name,
        candidate_last_name,
        candidate_email,
        candidate_headline,
        candidate_city,
        candidate_experience,
        candidate_skills,
        candidate_profile_picture,
        candidate_resume,
        status,
        created_at,
    } = application;

    const fullName  = [candidate_first_name, candidate_last_name].filter(Boolean).join(" ") || candidate_name;
    const skills    = candidate_skills ? candidate_skills.split(",").filter(Boolean).slice(0, 6) : [];
    const appliedOn = new Date(created_at).toLocaleDateString();

    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition">

            {/* ── Top row: avatar + info + status ── */}
            <div className="flex items-start gap-4">

                {/* Avatar */}
                <div className="shrink-0">
                    {candidate_profile_picture ? (
                        <img
                            src={mediaUrl(candidate_profile_picture)}
                            alt={fullName}
                            className="w-14 h-14 rounded-xl object-cover border-2 border-primary-100"
                        />
                    ) : (
                        <div className="w-14 h-14 rounded-xl bg-primary-50 border-2 border-primary-100 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary-600">
                                {(candidate_first_name || candidate_name || "?").charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-base font-bold text-slate-800 truncate">{fullName}</h2>
                        <StatusBadge status={status} />
                    </div>
                    {candidate_headline && (
                        <p className="text-sm text-slate-500 mt-0.5 truncate">{candidate_headline}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-400">
                        {candidate_city && <span>📍 {candidate_city}</span>}
                        {candidate_experience !== undefined && candidate_experience !== null && (
                            <span>💼 {candidate_experience} yr{candidate_experience !== 1 ? "s" : ""} exp</span>
                        )}
                        <span>📅 Applied {appliedOn}</span>
                    </div>
                </div>
            </div>

            {/* ── Skills ── */}
            {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {skills.map((s, i) => <SkillBadge key={i} skill={s} />)}
                </div>
            )}

            {/* ── Action buttons ── */}
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">

                {/* View Profile */}
                <Link
                    to={`/candidate/${candidate_id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-50 text-primary-700 text-xs font-semibold border border-primary-100 hover:bg-primary-100 transition"
                >
                    👤 View Profile
                </Link>

                {/* View Resume */}
                {candidate_resume ? (
                    <a
                        href={mediaUrl(candidate_resume)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 hover:bg-slate-100 transition"
                    >
                        📄 View Resume
                    </a>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 text-slate-400 text-xs font-medium border border-slate-100 cursor-default">
                        📄 No Resume
                    </span>
                )}

                {/* Status actions */}
                <div className="ml-auto flex gap-2">
                    <button
                        onClick={() => onStatus(id, "ACCEPTED")}
                        className="px-4 py-2 rounded-lg bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition"
                    >
                        ✓ Accept
                    </button>
                    <button
                        onClick={() => onStatus(id, "REJECTED")}
                        className="px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-semibold hover:bg-red-600 transition"
                    >
                        ✕ Reject
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Applicants() {
    const { id } = useParams();

    const [applications, setApplications] = useState([]);
    const [search, setSearch]             = useState("");
    const [loading, setLoading]           = useState(true);

    const debounceRef = useRef(null);

    async function loadApplicants(q = "") {
        try {
            const data = await getApplicants(id, q);
            setApplications(data);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadApplicants();
    }, [id]);

    // Debounced search
    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setLoading(true);
            loadApplicants(val);
        }, 300);
    }

    async function handleStatus(applicationId, status) {
        try {
            await updateApplicationStatus(applicationId, status);
            loadApplicants(search);
        } catch (error) {
            console.log(error.response?.data);
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Applicants</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {loading ? "Loading…" : `${applications.length} applicant${applications.length !== 1 ? "s" : ""}`}
                    </p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-80">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search by name, skills, city…"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition"
                    />
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full" />
                </div>
            ) : applications.length === 0 ? (
                <div className="bg-white rounded-xl border p-12 text-center">
                    <p className="text-4xl mb-4">👥</p>
                    <p className="text-slate-600 font-medium">
                        {search ? "No applicants match your search." : "No one has applied yet."}
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {applications.map((app) => (
                        <ApplicantCard
                            key={app.id}
                            application={app}
                            onStatus={handleStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
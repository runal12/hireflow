import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCandidateProfile } from "../api/users";
import { mediaUrl } from "../utils/mediaUrl";

// ── Helpers ───────────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <span className="text-lg leading-none mt-0.5">{icon}</span>
            <div>
                <p className="text-xs text-slate-500 font-medium">{label}</p>
                <p className="text-sm text-slate-800 font-semibold">{value}</p>
            </div>
        </div>
    );
}

function SkillBadge({ skill }) {
    return (
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
            {skill.trim()}
        </span>
    );
}

function ExternalLink({ href, icon, label }) {
    if (!href) return null;
    return (
        <a
            href={href.startsWith("http") ? href : `https://${href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-800 transition"
        >
            <span>{icon}</span> {label}
        </a>
    );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function CandidateProfile() {
    const { id } = useParams();
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const data = await getCandidateProfile(id);
                setUser(data);
            } catch (err) {
                setError("Could not load this profile.");
                console.error(err.response?.data);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full" />
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="text-center py-24">
                <p className="text-4xl mb-4">🚫</p>
                <h2 className="text-xl font-semibold text-slate-800">{error || "Profile not found."}</h2>
                <Link to={-1} className="mt-4 inline-block text-sm text-primary-600 hover:underline">← Go back</Link>
            </div>
        );
    }

    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username;
    const skills   = user.skills ? user.skills.split(",").filter(Boolean) : [];
    const hasLinks = user.github || user.linkedin || user.portfolio;

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

            {/* Back link */}
            <Link
                to={-1}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition mb-6"
            >
                ← Back
            </Link>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60">

                {/* ── Banner + Avatar ── */}
                <div className="relative h-36 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700">
                    <div className="absolute -bottom-12 left-8 z-10">
                        {user.profile_picture ? (
                            <img
                                src={mediaUrl(user.profile_picture)}
                                alt={fullName}
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-white ring-4 ring-white shadow-lg flex items-center justify-center">
                                <span className="text-3xl font-bold text-primary-600">
                                    {(user.first_name || user.username || "U").charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="px-8 pb-8">

                    {/* Name + headline */}
                    <div className="pt-14 mb-6">
                        <h1 className="text-2xl font-bold text-slate-900">{fullName}</h1>
                        {user.username && fullName !== user.username && (
                            <p className="text-sm text-slate-500 mt-0.5">@{user.username}</p>
                        )}
                        {user.headline && (
                            <p className="text-slate-600 mt-1">{user.headline}</p>
                        )}
                        {user.city && (
                            <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                                📍 {user.city}
                            </span>
                        )}
                    </div>

                    {/* ── Contact ── */}
                    {(user.email || user.phone || user.experience !== undefined) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-slate-50 rounded-xl mb-6">
                            <InfoRow icon="✉️" label="Email"      value={user.email} />
                            <InfoRow icon="📞" label="Phone"      value={user.phone} />
                            <InfoRow icon="💼" label="Experience" value={user.experience !== null ? `${user.experience} year${user.experience !== 1 ? "s" : ""}` : null} />
                        </div>
                    )}

                    {/* ── Bio ── */}
                    {user.bio && (
                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">About</h2>
                            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{user.bio}</p>
                        </div>
                    )}

                    {/* ── Skills ── */}
                    {skills.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((s, i) => <SkillBadge key={i} skill={s} />)}
                            </div>
                        </div>
                    )}

                    {/* ── Links ── */}
                    {hasLinks && (
                        <div className="mb-6">
                            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Links</h2>
                            <div className="flex flex-wrap gap-4">
                                <ExternalLink href={user.github}    icon="🐙" label="GitHub" />
                                <ExternalLink href={user.linkedin}  icon="💼" label="LinkedIn" />
                                <ExternalLink href={user.portfolio} icon="🌐" label="Portfolio" />
                            </div>
                        </div>
                    )}

                    {/* ── Resume ── */}
                    <div>
                        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Resume</h2>
                        {user.resume ? (
                            <a
                                href={mediaUrl(user.resume)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                            >
                                ⬇ Download Resume
                            </a>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No resume uploaded.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { mediaUrl } from "../utils/mediaUrl";

// ─── Reusable Input ───────────────────────────────────────────────────────────
function Input({ label, name, value, onChange, error, type = "text", placeholder = "" }) {
    return (
        <div>
            <label className="block mb-1.5 text-sm font-semibold text-slate-700">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value ?? ""}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 bg-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500/30 ${
                    error
                        ? "border border-red-500 focus:border-red-500"
                        : "border border-slate-300 focus:border-primary-500"
                }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600">{error[0]}</p>
            )}
        </div>
    );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ icon, title }) {
    return (
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-5">
            <span className="text-primary-600 text-lg">{icon}</span>
            <h2 className="text-base font-bold text-slate-700 uppercase tracking-wide">
                {title}
            </h2>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EditProfile() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        headline: "",
        city: "",
        bio: "",
        skills: "",
        experience: "",
        github: "",
        linkedin: "",
        portfolio: "",
    });

    // File states
    const [resume, setResume] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    // Existing file URLs from server
    const [existingResumeUrl, setExistingResumeUrl] = useState(null);
    const [existingPictureUrl, setExistingPictureUrl] = useState(null);

    // Preview for newly selected picture
    const [picturePreview, setPicturePreview] = useState(null);

    const pictureInputRef = useRef(null);
    const resumeInputRef = useRef(null);

    // UI states
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [fieldErrors, setFieldErrors] = useState({});

    // ── Fetch existing profile ────────────────────────────────────────────────
    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await client.get("users/me/");
                const d = res.data;
                setForm({
                    first_name: d.first_name || "",
                    last_name:  d.last_name  || "",
                    email:      d.email      || "",
                    phone:      d.phone      || "",
                    headline:   d.headline   || "",
                    city:       d.city       || "",
                    bio:        d.bio        || "",
                    skills:     d.skills     || "",
                    experience: d.experience ?? "",
                    github:     d.github     || "",
                    linkedin:   d.linkedin   || "",
                    portfolio:  d.portfolio  || "",
                });
                setExistingResumeUrl(d.resume || null);
                setExistingPictureUrl(d.profile_picture || null);
            } catch (err) {
                console.error(err);
                setErrorMsg("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    // ── Handlers ──────────────────────────────────────────────────────────────
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handlePictureChange(e) {
        const file = e.target.files[0];
        if (!file) return;
        setProfilePicture(file);
        setPicturePreview(URL.createObjectURL(file));
    }

    function handleResumeChange(e) {
        setResume(e.target.files[0] || null);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg("");
        setErrorMsg("");
        setFieldErrors({});

        try {
            const formData = new FormData();

            // Append all text fields
            Object.entries(form).forEach(([key, val]) => {
                formData.append(key, val);
            });

            // Append files only if newly selected
            if (profilePicture) formData.append("profile_picture", profilePicture);
            if (resume)         formData.append("resume", resume);

            await client.patch("users/me/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccessMsg("Profile updated successfully!");
            setTimeout(() => navigate("/profile"), 1500);
        } catch (err) {
            console.log(err.response?.data);

            if (err.response?.data) {
                setFieldErrors(err.response.data);
            } else {
                setErrorMsg("Unable to update profile.");
            }
        } finally {
            setSaving(false);
        }
    }

    // ── Loading Spinner (existing) ────────────────────────────────────────────
    if (loading) {
        return (
            <div className="flex justify-center items-center py-24">
                <div className="animate-spin w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full" />
            </div>
        );
    }

    // ── Profile picture source ────────────────────────────────────────────────
    const avatarSrc = picturePreview || mediaUrl(existingPictureUrl) || null;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

                {/* ── Header ── */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-8">
                    <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
                    <p className="text-primary-100 mt-1 text-sm">
                        Keep your profile updated so recruiters know more about you.
                    </p>
                </div>

                {/* ── Alerts ── */}
                {successMsg && (
                    <div className="mx-8 mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
                        <span>✅</span> {successMsg}
                    </div>
                )}
                {errorMsg && (
                    <div className="mx-8 mt-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
                        <span>⚠️</span> {errorMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-8 space-y-10">

                    {/* ── Profile Picture ── */}
                    <div>
                        <SectionHeading icon="🖼️" title="Profile Picture" />
                        <div className="flex flex-col sm:flex-row items-center gap-6">

                            {/* Avatar preview */}
                            <div className="relative shrink-0">
                                {avatarSrc ? (
                                    <img
                                        src={avatarSrc}
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full object-cover border-4 border-primary-100 shadow-md"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-full bg-slate-100 border-4 border-primary-100 flex items-center justify-center text-4xl text-slate-400 shadow-md select-none">
                                        👤
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => pictureInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center shadow hover:bg-primary-700 transition"
                                    title="Change photo"
                                >
                                    ✏️
                                </button>
                            </div>

                            <div className="flex-1 w-full">
                                <p className="text-sm text-slate-500 mb-3">
                                    Accepted formats: JPG, PNG, GIF, WebP (max 5 MB recommended)
                                </p>
                                <button
                                    type="button"
                                    onClick={() => pictureInputRef.current?.click()}
                                    className="inline-flex items-center gap-2 rounded-xl border border-primary-300 bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-100 transition"
                                >
                                    📁 {avatarSrc ? "Change Photo" : "Upload Photo"}
                                </button>
                                {profilePicture && (
                                    <p className="mt-2 text-xs text-slate-500 truncate">
                                        Selected: {profilePicture.name}
                                    </p>
                                )}
                                <input
                                    ref={pictureInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePictureChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Basic Info ── */}
                    <div>
                        <SectionHeading icon="👤" title="Basic Information" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input label="First Name"  name="first_name" value={form.first_name} onChange={handleChange} error={fieldErrors.first_name} />
                            <Input label="Last Name"   name="last_name"  value={form.last_name}  onChange={handleChange} error={fieldErrors.last_name} />
                            <Input label="Email"       name="email"      value={form.email}      onChange={handleChange} type="email" error={fieldErrors.email} />
                            <Input label="Phone"       name="phone"      value={form.phone}      onChange={handleChange} placeholder="+91 98765 43210" error={fieldErrors.phone} />
                            <div className="md:col-span-2">
                                <Input label="Headline" name="headline" value={form.headline} onChange={handleChange} placeholder="e.g. Full Stack Developer at Acme Corp" error={fieldErrors.headline} />
                            </div>
                            <Input label="City" name="city" value={form.city} onChange={handleChange} placeholder="Mumbai, India" error={fieldErrors.city} />
                        </div>
                    </div>

                    {/* ── Bio ── */}
                    <div>
                        <SectionHeading icon="📝" title="About" />
                        <label className="block mb-1.5 text-sm font-semibold text-slate-700">Bio</label>
                        <textarea
                            rows={5}
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            placeholder="Tell recruiters about yourself, your passions, and career goals..."
                            className={`w-full rounded-xl bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500/30 resize-none ${
                                fieldErrors.bio
                                    ? "border border-red-500 focus:border-red-500"
                                    : "border border-slate-300 focus:border-primary-500"
                            }`}
                        />
                        {fieldErrors.bio && (
                            <p className="mt-1 text-sm text-red-600">{fieldErrors.bio[0]}</p>
                        )}
                    </div>

                    {/* ── Skills & Experience ── */}
                    <div>
                        <SectionHeading icon="💡" title="Skills & Experience" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <Input
                                    label="Skills"
                                    name="skills"
                                    value={form.skills}
                                    onChange={handleChange}
                                    placeholder="React, Django, PostgreSQL, Docker..."
                                    error={fieldErrors.skills}
                                />
                                <p className="mt-1.5 text-xs text-slate-400">Separate skills with commas</p>
                            </div>
                            <Input
                                label="Experience (Years)"
                                name="experience"
                                type="number"
                                value={form.experience}
                                onChange={handleChange}
                                placeholder="0"
                                error={fieldErrors.experience}
                            />
                        </div>
                    </div>

                    {/* ── Links ── */}
                    <div>
                        <SectionHeading icon="🔗" title="Links" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input label="GitHub"    name="github"    value={form.github}    onChange={handleChange} placeholder="https://github.com/username"           error={fieldErrors.github} />
                            <Input label="LinkedIn"  name="linkedin"  value={form.linkedin}  onChange={handleChange} placeholder="https://linkedin.com/in/username"  error={fieldErrors.linkedin} />
                            <div className="md:col-span-2">
                                <Input label="Portfolio" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://yourportfolio.com" error={fieldErrors.portfolio} />
                            </div>
                        </div>
                    </div>

                    {/* ── Resume ── */}
                    <div>
                        <SectionHeading icon="📄" title="Resume" />
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                            {existingResumeUrl && (
                                <a
                                    href={mediaUrl(existingResumeUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition shrink-0"
                                >
                                    📎 View Current Resume
                                </a>
                            )}

                            <div className="flex-1 w-full">
                                <button
                                    type="button"
                                    onClick={() => resumeInputRef.current?.click()}
                                    className="inline-flex items-center gap-2 rounded-xl border border-primary-300 bg-primary-50 px-5 py-2.5 text-sm font-semibold text-primary-700 hover:bg-primary-100 transition"
                                >
                                    📁 {existingResumeUrl ? "Replace Resume" : "Upload Resume"}
                                </button>
                                {resume ? (
                                    <p className="mt-2 text-xs text-slate-500 truncate">
                                        Selected: {resume.name}
                                    </p>
                                ) : (
                                    <p className="mt-2 text-xs text-slate-400">
                                        Accepted: .pdf, .doc, .docx
                                    </p>
                                )}
                                <input
                                    ref={resumeInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>

                    {/* ── Actions ── */}
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
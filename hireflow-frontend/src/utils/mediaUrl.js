/**
 * Converts a Django media URL to a fully-qualified URL pointing at the
 * Django backend server.
 *
 * WHY THIS EXISTS
 * ───────────────
 * Django's FileField / ImageField serializes to a RELATIVE path like:
 *   /media/resumes/file.pdf
 *
 * In development the React app runs on :5173 and Django on :8000.
 * If a relative URL is used directly as an <a href>, the browser requests
 * it from :5173 (Vite), which has no /media/ route → 404.
 *
 * This helper prefixes the Django origin so every media URL always resolves
 * to :8000, regardless of which dev server the React app is running on.
 *
 * In production both servers share the same origin, so the function is a
 * no-op (the URL is already absolute).
 *
 * @param {string|null|undefined} url - Raw value from the API
 * @returns {string|null}            - Absolute URL or null if no file
 */
// Derive the bare Django origin from VITE_API_URL (strip trailing /api/ or /api).
// e.g. "http://127.0.0.1:8000/api/" → "http://127.0.0.1:8000"
//      "https://hireflow-backend-q8eh.onrender.com/api/" → "https://hireflow-backend-q8eh.onrender.com"
const DJANGO_BASE_URL = (import.meta.env.VITE_API_URL || "")
  .replace(/\/api\/?$/, "");

export function mediaUrl(url) {
    if (!url) return null;

    // Already absolute (http:// or https://) — return as-is
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    // Relative path — prepend the Django origin
    return `${DJANGO_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

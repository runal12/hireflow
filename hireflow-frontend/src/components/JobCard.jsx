import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-800 group-hover:text-primary-600 transition-colors duration-200">
            {job.title}
          </h2>
          {job.company && (
            <p className="text-sm text-slate-500 mt-0.5">{job.company}</p>
          )}
        </div>
        {job.type && (
          <span className="shrink-0 text-xs font-medium px-3 py-1 rounded-full bg-primary-50 text-primary-600 border border-primary-100">
            {job.type}
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-5">
        {job.location && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {job.location}
          </div>
        )}
        {job.skills && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 6h.008v.008H6V6z" />
            </svg>
            {job.skills}
          </div>
        )}
      </div>

      {/* CTA */}
      <Link to={`/jobs/${job.id}`}>
        <button className="w-full px-4 py-2.5 text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-600 hover:text-white rounded-lg border border-primary-100 hover:border-primary-600 transition-all duration-200 cursor-pointer">
          View Details →
        </button>
      </Link>
    </div>
  );
}
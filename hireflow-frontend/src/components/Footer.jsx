export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xs">H</span>
            </div>
            <span className="text-lg font-bold text-slate-800">HireFlow</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-500">
            © 2026 HireFlow. All rights reserved.
          </p>

          {/* Social / Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors duration-200" aria-label="Privacy Policy">
              Privacy
            </a>
            <a href="#" className="text-slate-400 hover:text-primary-600 transition-colors duration-200" aria-label="Terms of Service">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
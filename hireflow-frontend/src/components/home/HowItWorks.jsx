export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Create Account",
            description: "Sign up in seconds with your email. Choose candidate or recruiter role.",
        },
        {
            number: "02",
            title: "Complete Profile",
            description: "Add your skills, experience, and preferences to stand out.",
        },
        {
            number: "03",
            title: "Browse & Apply",
            description: "Discover matching opportunities and apply with a single click.",
        },
        {
            number: "04",
            title: "Get Hired",
            description: "Track your applications and land your dream role.",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                        How It Works
                    </h2>
                    <p className="mt-4 text-lg text-slate-500">
                        Four simple steps to your next career move
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative text-center group">
                            {/* Connector line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-[60%] w-[calc(100%-20%)] h-0.5 bg-gradient-to-r from-primary-200 to-primary-100"></div>
                            )}

                            <div className="relative inline-flex items-center justify-center w-16 h-16 bg-primary-50 group-hover:bg-primary-100 text-primary-600 rounded-2xl text-xl font-bold mb-5 transition-colors duration-300">
                                {step.number}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import FeaturedJobs from "../components/home/FeaturedJobs";
import HowItWorks from "../components/home/HowItWorks";
import CTA from "../components/home/CTA";

export default function Home() {
    return (
        <div>
            <Hero />
            <Features />
            <FeaturedJobs />
            <HowItWorks />
            <CTA />
        </div>
    );
}
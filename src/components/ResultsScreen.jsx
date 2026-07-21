import Gauge from "./Guage.jsx";
import SignalCard from "./signalCard.jsx";
import { Link2, MessageSquareWarning, FileText, Search, Sparkles } from "lucide-react";

export default function ResultScreen({ score, verdict, signals, breakdown, setScreen }) {
    const iconMap = {
        domain: Link2,
        language: MessageSquareWarning,
        structural: FileText,
        factcheck: Search,
    };

    if (!signals) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center text-white">
                <p>Loading result...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black p-3 md:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-6 md:p-10 flex flex-col items-center">
                    <Gauge score={score} />
                    <div
                        className={`${
                            score > 70
                                ? "bg-bggreen text-lightgreen"
                                : score > 40
                                ? "bg-yellow-800 text-yellow-200"
                                : "bg-red-900 text-red-300"
                        } p-2 md:px-6 md:py-3 rounded-xl font-ibmplex my-5 md:text-lg`}
                    >
                        {verdict}
                    </div>
                    <p className="font-grotesk text-gray-300 text-sm md:text-base text-center md:max-w-md">
                        {breakdown}
                    </p>
                </div>

                <div className="my-5">
                    <p className="font-ibmplex text-white mb-3 md:text-lg">The breakdown</p>
                    <div className="md:grid md:grid-cols-2 md:gap-4">
                        {signals.map((signal) => (
                            <SignalCard
                                key={signal.key}
                                icon={iconMap[signal.key]}
                                title={signal.title}
                                status={signal.status}
                                note={signal.note}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-orange-500/30 border border-orange rounded-xl p-6 flex justify-center items-center text-orange md:max-w-2xl md:mx-auto">
                    <Sparkles size={32} className="text-orange-400 shrink-0 mt-0 mr-3" />
                    <p className="md:text-base">
                        TellDem gives signals, not final <br /> truth - always confirm before <br /> sharing
                    </p>
                </div>

                <div className="flex justify-center">
                    <button
                        className="bg-orange-300 px-12 py-4 m-12 rounded-3xl font-bold text-red-950 md:px-16 md:text-lg hover:bg-orange-400 transition-colors"
                        onClick={() => setScreen("input")}
                    >
                        Check Another Information
                    </button>
                </div>
            </div>
        </div>
    );
}
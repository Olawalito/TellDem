import Gauge from "./Guage.jsx";
import SignalCard from "./signalCard.jsx";
import { Link2, MessageSquareWarning, FileText, Search, Sparkles, HelpCircle } from "lucide-react";
import { useState,useEffect } from "react";


export default function ResultScreen({ score, verdict, signals, breakdown, setScreen, loading, error }) {
    const iconMap = {
        domain: Link2,
        language: MessageSquareWarning,
        structural: FileText,
        factcheck: Search,
    };

    const loadingMessages = [
    "Checking under rock...",
    "Asking your lecturer...",
    "Calling Aunty Ngozi...",
    "Consulting the village elders...",
    "Cross-checking with agbaya...",
    "Running away from the mis-information bandits...",
    "Asking Baba Ijebu...",
    "Sending message to Oga at the top...",
    "Checking with Mama put down the road...",
    "Calling the group chat to confirm...",
    "Interrogating the WhatsApp uncle...",
    "Verifying with the town crier...",
    "Asking Alhaji for confirmation...",
    "Placing call to Abuja...",
    "Confirming with NAN correspondent...",
    "Doing small small investigation...",
    "Checking if na true true...",
    "Wahala dey, make we confam am...",
    "Passing through the grapevine...",
    "Drinking information agbo..."
];

    const [messageIndex, setMessageIndex] = useState(0);
    
    useEffect(() =>{
        if(!loading) return;

        const interval = setInterval(()=>{
            setMessageIndex((prev)=> (prev + 1) % loadingMessages.length );
        },1500
    );

    return () => clearInterval(interval);
    },[loading])

    if(loading){
        return(
          <div className="min-h-screen w-full bg-black flex items-center justify-center text-white flex-col">
                <p className="animate-pulse text-lg font-ibmplex text-gray-400 ">{loadingMessages[messageIndex]}</p>
            </div>)
    };

    if (error) {
        return (
            <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center text-white gap-3 px-6 text-center">
                <p className="font-inter text-lg text-red-400">Something went wrong.</p>
                <p className="font-inter text-sm text-gray-400">{error}</p>
                <button
                    className="bg-orange-300 px-12 py-4 m-4 rounded-3xl font-bold text-red-950 hover:bg-orange-400 transition-colors"
                    onClick={() => setScreen("input")}
                >
                    Try Again
                </button>
            </div>
        );
    }


    if( score === undefined ){
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center text-white flex-col">
                <p className="font-inter text-xl">No checks done.</p>
                <button className="bg-orange-300 px-12 py-4 m-12 rounded-3xl font-bold text-red-950 md:px-16 md:text-lg hover:bg-orange-400 transition-colors" onClick={()=>{setScreen("input")}}>Go paste something</button>
                
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black p-3 md:p-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-4 md:p-5 mb-4 md:mb-6">
                <p className="text-[10px] md:text-xs text-gray-500 tracking-wide mb-1 font-ibmplex">
                    YOU CHECKED
                </p>
                <p className="text-xs md:text-sm text-gray-300 italic leading-relaxed line-clamp-3 md:line-clamp-none">
                    "{checkedMessage}"
                </p>
            </div>
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
                                icon={iconMap[signal.key] || HelpCircle} 
                                title={signal.title}
                                status={signal.status}
                                note={signal.note}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-orange-500/30 border border-orange rounded-xl p-6 flex justify-center items-center text-orange md:max-w-2xl md:mx-auto">
                    <Sparkles size={32} className="text-orange-400 shrink-0 mt-0 mr-3" />
                    <div className="text-center">
                        <p className="md:text-base">
                        TellDem dey give you clues, not final final.  
                    </p>
                    <p>Still use your head before you share.</p>
                    </div>
                    
                </div>

                <div className="flex justify-center">
                    <button
                        className="bg-orange-300 px-12 py-8 md:py-4 m-12 rounded-3xl font-bold text-red-950 md:px-16 md:text-lg hover:bg-orange-400 transition-colors"
                        onClick={() => setScreen("input")}
                    >
                        Check Another Information
                    </button>
                </div>
            </div>
        </div>
    );
}
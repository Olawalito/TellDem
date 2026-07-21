import input from "../assets/input-logo.png"
import result from "../assets/result-logo.png"

export default function Footer({ screen, setScreen }) {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-700 flex justify-around items-center py-3 md:hidden">
            <button
                type="button"
                onClick={() => setScreen("input")}
                className={`flex flex-col items-center gap-1 text-xs font-grotesk ${
                    screen === "input" ? "text-orange bg-orange" : "text-gray-500"
                }`}
            >
                <img src={input} alt="" className="w-5 h-5" />
                Input
            </button>

            <button
                type="button"
                onClick={() => setScreen("result")}
                className={`flex flex-col items-center gap-1 text-xs font-grotesk ${
                    screen === "results" ? "text-orange bg-orange" : "text-gray-500"
                }`}
            >
                <img src={result} alt="" className="w-5 h-5" />
                Result
            </button>
        </footer>
    );
}
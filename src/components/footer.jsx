import input from "../assets/input-logo.png"
import result from "../assets/result-logo.png"

export default function Footer({ screen, setScreen }) {
    return (
        <footer className="fixed mt-4 bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-700 flex justify-around items-center py-3 md:hidden">
                 <button
    type="button"
    onClick={() => setScreen("input")}
    className={`flex flex-col items-center gap-1 text-xs font-grotesk px-4 py-1.5 rounded-xl transition-colors ${
        screen === "input" ? "bg-orange-400 text-black" : "text-gray-500"
    }`}
>
    <img src={input} alt="" className="w-5 h-5" />
    Input
</button>

            <button
    type="button"
    onClick={() => setScreen("result")}
    className={`flex flex-col items-center gap-1 text-xs font-grotesk px-4 py-1.5 rounded-xl transition-colors ${
        screen === "result" ? "bg-orange-400 text-black" : "text-gray-500"
    }`}
>
    <img src={result} alt="" className="w-5 h-5" />
    Result
</button>
        </footer>
    );
}
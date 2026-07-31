import input from "../assets/input-logo.png";
import result from "../assets/result-logo.png";

export default function Header({ screen, setScreen }) {
    return (
        <header className="bg-neutral px-3 py-2 md:px-6 md:py-4 flex justify-between items-center border border-gray-500">
            <h1 className="font-grotesk text-white font-bold text-base md:text-2xl">
                Tell<span className="text-orange">Dem</span>
            </h1>

            <div className="flex text-white gap-2 md:gap-8">
                <button
                    onClick={() => setScreen("input")}
                    className={`${
                        screen === "input" ? "bg-orange text-black" : "text-gray-500"
                    } flex items-center gap-1.5 md:gap-2 p-1 px-2.5 md:px-4 rounded-lg text-xs md:text-base transition-colors font-grotesk font-bold`}
                >
                    <img src={input} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                    Input
                </button>

                <button
                    onClick={() => setScreen("result")}
                    className={`${
                        screen === "result" ? "bg-orange text-black" : "text-gray-500"
                    } flex items-center gap-1.5 md:gap-2 p-1 px-2.5 md:px-4 rounded-lg text-xs md:text-base transition-colors font-grotesk font-bold`}
                >
                    <img src={result} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                    Result
                </button>
            </div>
        </header>
    );
}
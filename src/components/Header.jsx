import input from "../assets/input-logo.png";
import result from "../assets/result-logo.png";

export default function Header({screen, setScreen}){
    return(
        <>
        <header className="bg-neutral p-2 md:p-4 flex justify-between border border-gray-500">
                <h1 className="font-grotesk text-white font-bold md:text-2xl">Tell<span className="text-orange ">Dem</span></h1>
                <div className="flex text-white gap:4 md:gap-8">
                    <button onClick={() => {setScreen("input")}}
                    className={`${screen === "input" ? "bg-orange text-black p-1 rounded-lg px-4" : " text-gray-500 p-1 px-4"} flex gap-2`}
    >
    <img src={input} alt="" className={`w-5 h-5 ${ screen === "input" ? "bg-orange" : " "}`} />
    Input
</button>

            <button onClick={() => {setScreen("result")}}
                className={`${screen === "result" ? "bg-orange text-black p-1 rounded-lg px-4" : " text-gray-500 p-1 px-4"} flex gap-2`}
            >
                <img src={result} alt="" className={`w-5 h-5 ${ screen === "result" ? "bg-orange" : " "}`} />
                Result
            </button>
                    </div>
        </header>
        </>
    )
}
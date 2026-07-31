export default function Gauge({ score}) {
    const pathLength = 251; 
    const color = score > 70 ? "#3FA796" : score > 40 ? "#E8A33D" : "#D64545";
    return (
        <div className="relative w-56 h-32 mx-auto">
            <svg viewBox="0 0 200 110" className="w-full h-full">
                {/* background track */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#243447"
                    strokeWidth="14"
                    strokeLinecap="round"
                />
                {/* colored progress */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={color}
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={`${(score / 100) * pathLength} ${pathLength}`}
                    style={{ transition: "stroke-dasharray 800ms ease" }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                <span className="font-mono-plex text-3xl text-white font-semibold">{score}</span>
                <span className="text-xs text-gray-400 tracking-wide">VERACITY SCORE</span>
            </div>
        </div>
    );
}
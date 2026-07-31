const statusStyles = {
    good: { color: "#3FA796", bg: "rgba(63,167,150,0.15)", label: "SOLID" },
    warn: { color: "#E8A33D", bg: "rgba(232,163,61,0.15)", label: "CHECK AM" },
    bad: { color: "#D64545", bg: "rgba(214,69,69,0.15)", label: "RED FLAG" },
    none: { color: "#8FA0B3", bg: "rgba(143,160,179,0.15)", label: "NO MATCH" },
};

export default function SignalCard({ icon: Icon, title, status, note }) {
    const s = statusStyles[status] || statusStyles.none;

    return (
        <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-4 flex gap-3 items-start my-4">
            <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: s.bg }}
            >
                <Icon size={18} style={{ color: s.color }} />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-center mb-1 gap-2">
                    <span className="font-grotesk font-semibold text-sm text-white">{title}</span>
                    <span
                        className="font-mono-plex text-[10px] px-2 py-0.5 rounded-full tracking-wide whitespace-nowrap"
                        style={{ color: s.color, backgroundColor: s.bg }}
                    >
                        {s.label}
                    </span>
                </div>
                <p className="font-inter text-xs text-gray-400 leading-relaxed">{note}</p>
            </div>
        </div>
    );
}
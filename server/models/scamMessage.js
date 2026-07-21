import mongoose from "mongoose"

const scamMessageSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        isScam: { type: Boolean, required: true },
        tactic: {
            type: String,
            enum: ["urgency", "fake_authority", "too_good_to_be_true", "suspicious_link", "poor_grammar", "emotional_manipulation", "none"],
            default: "none",
        },
        explanation: { type: String },
    },
    { timestamps: true }
);

export const scamMessage = mongoose.model("scamMessage", scamMessageSchema);
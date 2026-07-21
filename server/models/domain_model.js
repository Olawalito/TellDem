import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
    {
        domain: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        category: {
            type: String,
            enum: ["trusted", "untrusted"],
            required: true,
        },
        notes: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Domain = mongoose.model("Domain", domainSchema);
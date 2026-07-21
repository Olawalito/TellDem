import "dotenv/config";
import connectDB from "./db/db.js";
import express from "express";
import cors from "cors";
import { aiCheck } from "./utils/aiCheck.js";


const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) =>{
              console.log("ERROR", error);
              throw error;
            });
        
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on ${process.env.PORT || 8000}`)
        })
    } catch (error) {
        console.log("Connection failed", error)
    }
};

app.post("/api/check", async (req,res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });
    const result = await aiCheck(text);
    res.json(result);
})

startServer();
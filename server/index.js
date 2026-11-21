import "dotenv/config";
import express from "express";
import cors from "cors";
import { aiCheck } from "./utils/aiCheck.js";
import multer from "multer";
import { aiImageDetect } from "./utils/aiImgcheck.js";
import { reverseImgSearch } from "./utils/imageCheck.js";

const upload = multer({ storage: multer.memoryStorage() });
const app = express();
app.use(express.json());
app.use(cors());

const startServer = async () => {
    try {
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

app.post("/api/image-check", upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image provided" });

    const { text } = req.body; 

    const [reverseImgSearchResult, detectAiImageResult] = await Promise.all([
        reverseImgSearch(req.file),
        aiImageDetect(req.file),
    ]);

    const imageAnalysis = {
        reverseSearch: reverseImgSearchResult,
        aiDetection: detectAiImageResult,
    };

    const result = await aiCheck(text || "", imageAnalysis);
    res.json(result);
});
startServer();

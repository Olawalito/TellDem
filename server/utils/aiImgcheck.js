import FormData from "form-data";
import axios from "axios";

export const aiImageDetect = async (img) => {
    try {
        const data = new FormData();

        data.append('media', img.buffer, img.originalname);
        data.append('models', 'genai');
        data.append('api_user', process.env.SIGHTENGINE_USER);
        data.append('api_secret', process.env.SIGHTENGINE_SECRET);

        const response = await axios({
            method: 'post',
            url: 'https://api.sightengine.com/1.0/check.json',
            data: data,
            headers: data.getHeaders()
        });

        return response.data;
    } catch (error) {
        console.log("AI-image detection failed:", error.message);
        return { error: true, message: "AI-image detection failed" };
    }
};
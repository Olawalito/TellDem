export const searchFactCheck = async (query) => {
    const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(query)}&key=${process.env.FACT_CHECK_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.claims || [];
    } catch (error){
        console.log("Fast Check API connection error:", error);
        return[];
    }
}
import axios from "axios";

export const imgUrlSearch = async (imageFile) => {
    const formData = new FormData();
    const blob = new Blob([imageFile.buffer]);
    formData.append("image", blob, imageFile.originalname);

    const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.IMG_BB}`,
        {
            method: "POST",
            body: formData,
        }
    );

    const data = await response.json();

    console.log(data.data.url)
    return data.data.url;
};

export const reverseImgSearch = async (imageFile) => {
    try {
        const imgUrl = await imgUrlSearch(imageFile);

        const response = await axios.request({
            method: "GET",
            url: "https://api.openwebninja.com/reverse-image-search/reverse-image-search",
            params: { url: imgUrl },
            headers: {
                "X-API-Key": process.env.REVERSE_IMG_SEARCH,
            },
        });

        return response.data;
    } catch (error) {
    console.log("Reverse image search error:", error.response?.data?.error || error.message);
    return { error: true, message: "Couldn't find any reverse image search results" };
}
};


import { useState } from "react";
import InputScreen from "./components/InputScreen.jsx";
import ResultScreen from "./components/ResultsScreen.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/footer.jsx";
import PageFooter from "./components/pageFooter.jsx";

export default function App(){

  const [ screen, setScreen ] = useState("input");
  const [ result, setResult ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
 
  const handleCheck = async (text, img) => {
    if (!text.trim() && !img) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setScreen("result");
    const imagePreview = img ? URL.createObjectURL(img) : null;

    if(img){
        try{
        const data = new FormData();

        data.append("image", img);
        data.append("text", text);

        const response = await fetch('https://telldem.onrender.com/api/image-check', {
            method: 'POST',
            body: data
        })

        const result = await response.json();

        console.log("Result source:", result.source);
        setResult({...result, checkedMessage : text, checkedImage: imagePreview});
        setScreen("result");
        }
        catch(error){
       console.log("Failed to fetch image result: ", error);
    }
    finally{ setLoading(false)}
    } 
    else{
    try {
        const response = await fetch('https://telldem.onrender.com/api/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Result source:", data.source);
        setResult({...data, checkedMessage : text, checkedImage: null});
        setScreen("result"); 
    } catch (err) {
        console.error("Fetch failure:", err);
        setError(err.message || "Something went wrong talking to the server.");
    } finally {
        setLoading(false);
    }
}};
  return(
  <>
  <Header screen={screen} setScreen={setScreen} />
  {screen === "input" && <InputScreen onCheck={handleCheck} screen={screen} setScreen={setScreen} />}
  {screen === "result" && <ResultScreen {...result} screen={screen} setScreen={setScreen} loading={loading} error={error} /> } 
  <PageFooter />
  </>)
}

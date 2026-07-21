import { useState } from "react"

export default function InputScreen({ onCheck, screen, setScreen }){
    const [text, setText] = useState("");

    const handleSubmit = () => {
      if(!text.trim()) return;
      onCheck(text);
      setScreen("result");
    }

    return(
    <>
     <div className="bg-linear-to-b from-black to-black min-h-screen w-full py-4 px-2.5 text-3xl text-center">
      <h1 className="font-inter  font-bold text-white mx-5 tracking-wide md:text-center md:mt-32 md:text-5xl">
        Before you forward am,<br className="md:hidden" /> make we <br className="hidden md:flex"/> check am first.
      </h1>
      <p className="font-grotesk text-gray-300 mx-5 text-sm mt-4 md:hidden">
        Paste any Whatsapp message, social media headline or link to get a credibility breakdown and avoid spreading misinformation.
      </p>
      <p  className="font-grotesk text-gray-300 text-sm md:text-center mt-4 hidden md:block">
        Combat misinformation in the Nigerian landscape. Paste a news clip, <br />WhatsApp message, or headline to verify the facts.
      </p>
      <div className="p-4 relative flex flex-col md:px-24">
        <textarea name="" id="" placeholder={`${window.innerWidth < 768 ? "Paste Message here..." : "Paste claim here... 'Did the government really say...?'"}`} className="bg-neutral-900 focus:ring-0 outline-none resize-none mt-5 md:mt-12 text-white w-full p-4 md:p-12 md:text-2xl rounded-6xl text-sm h-80 ring-0" 
        onChange={(e)=> {setText(e.target.value)}}>
        </textarea>
        <button className=" absolute bg-orange-500 font-inter font-semibold px-4 py-2 text-lg rounded-4xl md:rounded-sm bottom-7 right-7 md:right-32 disabled:opacity-40 disabled:cursor-not-allowed" onClick={handleSubmit} disabled={!text.trim()}>Check am</button>
      </div>
      <p className=" text-orange-200 text-sm font-bold mx-5">OR TRY AN EXAMPLE</p>
      <div>
        <button></button>
        <button></button>
        <button></button>
      </div>
     </div>
     
    </>)
}
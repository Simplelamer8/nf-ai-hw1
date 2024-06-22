"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const[inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{from: string, content: string}[]>([]);

  useEffect(() => {
    const retrieveMessages = async () =>  {
      try{
        const response = await axios.get("http://localhost:5000/api/v5/get-messages");
        setMessages(response.data);
      }
      catch(error)
      {
        console.log(error);
      }
    }
    retrieveMessages();
  }, [])

  async function handleSendMessage()
  { 
    try 
    {
      await axios.post("http://localhost:5000/api/v5/send-message", {from: "client", content: inputValue});
      const response = await axios.post("http://localhost:5000/api/v5/generate", {prompt: inputValue});
      await axios.post("http://localhost:5000/api/v5/send-message", {from: "gemini", content: response.data.response});
      
      setMessages([...messages, {from: "client", content: inputValue}]);
      setMessages([...messages, {from: "gemini", content: response.data.response}]);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {
        messages.map((message:{from: string, content: string}, index) => (
          <div key={index}>
            <p>{message.content}</p>
          </div>
        ))
      }
      <form>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button onClick={(e) =>{
          e.preventDefault();
          handleSendMessage();
          }}>Send</button>
      </form>
    </main>
  );
}

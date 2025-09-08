"use client";
import Image from "next/image";
// import Sidebar from "./app/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";


export default function Home() {

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "user", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "user", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
    // { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingbutton, setLoadingbutton] = useState(false);

  async function enhanceQuery(rawQuery) {
    setLoadingbutton(true);

    const res = await fetch("/api/enhance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: rawQuery }),
    });

    const data = await res.json();
    setLoadingbutton(false);

    return data.enhancedQuery;
  }

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chats: [newMsg]
        }),
      });

      const data = await res.json();
      // console.log(data);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content || "⚠️ No answer found.", reference: data.reference || "" },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error fetching response." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">

      {/* Chat Window */}
      <div className="h-full">
        <div className="p-18 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[70%] px-4 py-2 ${msg.role === "user"
                  ? "bg-primary rounded-br-none"
                  : " border shadow rounded-bl-none"
                  }`}
              >
                <CardContent className="p-0">{msg.content}</CardContent>
                {msg.reference && <CardContent className="text-gray-500 text-sm p-0">{msg.reference}</CardContent>}
              </Card>
            </motion.div>
          ))}
          {loading && (
            <p className="text-gray-500 text-sm">Instructor is typing...</p>
          )}
        </div>
      </div>
      {/* Input Box */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t sticky bottom-0 bg-background pb-4 flex gap-2 "
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your course doubt..."
          className="flex-1"
        />

        <Button type="submit" disabled={loading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up size-3.5"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
        </Button>
        <Button type="button" variant={"outline"} onClick={async () => setInput(await enhanceQuery(input))}
          disabled={loadingbutton}>
          {loadingbutton ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#DD4301" stroke="#DD4301" strokeWidth="15" width="30" height="30" x="25" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4" /></rect><rect fill="#DD4301" stroke="#DD4301" stroke-width="15" width="30" height="30" x="85" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2" /></rect><rect fill="#DD4301" stroke="#DD4301" strokeWidth="15" width="30" height="30" x="145" y="50"><animate attributeName="y" calcMode="spline" dur="2" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0" /></rect></svg> : "Enhance Query"}
        </Button>

      </form>
    </div >

  );
}






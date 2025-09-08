"use client";
import Image from "next/image";
// import Sidebar from "./app/components/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";


export default function Home() {

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi 👋 Ask me anything from the course transcripts!" },
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
    <div className="flex flex-col justify-center items-center h-screen">

      {/* Chat Window */}
      <Link href={"/chats"}>
        <Button >
          Get Started 🚀</Button>
      </Link>
    </div >

  );
}






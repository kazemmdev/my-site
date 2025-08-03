"use client"

import React, { useRef, useState } from "react"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

type Message = {
  text: string
  sender: "user" | "bot"
}

export default function FAQChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleSendMessage = async () => {
    if (input.trim() === "") return

    setMessages(prevMessages => [...prevMessages, { text: input, sender: "user" }])
    setInput("")
    setIsLoading(true)

    try {
      // Call the API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()

      if (response.ok) {
          if (data.audio) {
              const audioBlob = b64toBlob(data.audio, "audio/wav")
              const audioUrl = URL.createObjectURL(audioBlob)
              if (audioRef.current) {
                  audioRef.current.src = audioUrl
                  audioRef.current.play()
              }
          }

        if (data.text) {
          setMessages(prevMessages => [...prevMessages, { text: data.text, sender: "bot" }])
        }
      } else {
        const errorText = data.error || "Sorry, I couldn't get a response. Please try again."
        setMessages(prevMessages => [...prevMessages, { text: errorText, sender: "bot" }])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: "There was an error. Please try again later.",
          sender: "bot"
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
  }

  return (
    <div className="fixed bottom-0 right-0 z-20">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex">
        <Input
          type="text"
          className="flex-1 p-2 border rounded-lg focus:outline-none"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          disabled={isLoading}
          placeholder="Ask a question..."
        />
        <Button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </Button>
      </div>
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}

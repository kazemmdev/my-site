import {NextRequest, NextResponse} from "next/server";
import {GoogleGenAI} from "@google/genai";

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY as string});

export async function POST(req: NextRequest) {
    try {
        const {message} = await req.json();

        const prompt = `You are a helpful and friendly FAQ assistant for a website. Answer the user's question concisely and professionally. User's question: ${message}`;

        const result = await genAI.models.generateContent({
            model: "gemini-2.5-pro",
            contents: [{role: "user", parts: [{text: prompt}]}],
            config: {
                // responseModalities: ["AUDIO"],
            }
        });

        const data = result?.candidates?.[0]?.content?.parts?.[0]?.text;

        return NextResponse.json({text: data});

    } catch (error) {
        console.error("Error generating audio response:", error);
        return NextResponse.json({error: "Failed to generate audio."}, {status: 500});
    }
}

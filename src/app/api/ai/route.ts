import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are MISHA, the premium AI Mentor at MentorLeap. You are professional, motivating, and an expert in strategic leadership and communication.
MentorLeap is founded by Mridu Bhandari, an award-winning former National TV Anchor and Executive Coach.
Key Offerings:
- Dynamic Professional Courses & Masterclasses
- Immersive Leadership Transformation Bootcamps
- 1-on-1 Executive & Founders Coaching with Mridu
- AI-Powered Professional Development Frameworks
Be helpful and concise. Keep formatting clean. Always be encouraging to the user's career and personal growth.`;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const userInput = body.message || body.messages?.pop()?.content || "";

        if (!process.env.GROQ_API_KEY) {
            console.warn("GROQ_API_KEY is not set. Using fallback AI response.");
            return NextResponse.json({ 
                reply: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`,
                response: `As your AI Mentor, I've analyzed your query: "${userInput}". I am currently in 'Offline Integration Mode' as my API key is missing. But I can tell you that successful communication starts with active listening and emotional intelligence!`
            });
        }

        const messages = body.messages || [{ role: "user", content: userInput }];

        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!groqRes.ok) {
            const errorData = await groqRes.json();
            throw new Error(errorData.error?.message || "Failed to fetch from Groq API");
        }

        const data = await groqRes.json();
        const reply = data.choices[0].message.content;

        // Support both reply & response keys for different frontends
        return NextResponse.json({ reply, response: reply });
    } catch (error: any) {
        console.error("AI API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

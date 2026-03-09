import { NextRequest, NextResponse } from "next/server";

const PERSONALITY = "You are MISHA, the premium AI Mentor at MentorLeap. You are professional, motivating, and expert in leadership and communication.";

const BRAIN: Record<string, string> = {
    "free course": "🎓 Our flagship Personality Development Course by Mridu Bhandari is launching on March 15th! It's completely free for our early community members. Would you like me to help you enroll?",
    "bootcamp": "🚀 The Professional Transformation Bootcamp (March 28-29) is our most intensive program. It focuses on executive presence and high-stakes communication. We currently have a 50% early-bird discount!",
    "pricing": "💎 MentorLeap offers tiered access. Our base resources are free, while premium masterclasses range from ₹999 to ₹7999. Which program interests you?",
    "mridu": "🎤 Mridu Bhandari is an award-winning anchor and executive coach with over 15 years of experience in corporate communications. She personally leads our Masterclasses.",
};

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();
        const input = (message || "").toLowerCase();

        // 1. Check for specific keywords
        let reply = "";
        for (const [key, response] of Object.entries(BRAIN)) {
            if (input.includes(key)) {
                reply = response;
                break;
            }
        }

        // 2. Fallback to general intelligence
        if (!reply) {
            reply = `As your AI Mentor, I've analyzed your query: "${message}". That's a great question about leadership development. While I'm currently in 'Core Integration Mode', I can tell you that successful communication starts with active listening and emotional intelligence. How can we apply that to your current career goals?`;
        }

        return NextResponse.json({ reply, response: reply }); // Supporting both keys used by different components
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

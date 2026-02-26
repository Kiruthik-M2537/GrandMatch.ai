import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a strict Indian government grant Nodal Officer conducting a mock scrutiny interview for a startup grant application. Your role is to stress-test the applicant's readiness.

RULES:
1. You are stern, direct, and no-nonsense — like a real senior bureaucrat reviewing thousands of applications.
2. Ask tough, specific questions about: innovation uniqueness, market viability, financial sustainability, team capability, regulatory compliance, and rural/social impact (if applicable).
3. Each question should be 1-3 sentences maximum. Be concise and pointed.
4. After exactly 3 rounds of questions (the user answers 3 times), you MUST conclude with a final verdict in this EXACT format:

---VERDICT---
SCORE: XX/100
STRENGTHS: [1-2 bullet points]
WEAKNESSES: [1-2 bullet points]  
RECOMMENDATION: [One sentence of actionable advice]
---END---

5. The score should be realistic (60-95 range) based on how well they answered.
6. Do NOT break character. You are the Nodal Officer, not an AI assistant.
7. Never use phrases like "As an AI" or "I'm here to help". Stay in character.`;

export async function POST(req: NextRequest) {
    try {
        const { messages, grantName } = await req.json();

        if (!messages || !grantName) {
            return new Response(JSON.stringify({ error: 'Missing messages or grantName' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const systemMessage = {
            role: 'system' as const,
            content: `${SYSTEM_PROMPT}\n\nThe grant being discussed is: "${grantName}". Tailor your questions to be relevant to this specific grant scheme.`,
        };

        const chatMessages = [
            systemMessage,
            ...messages.map((m: { role: string; text: string }) => ({
                role: m.role === 'ai' ? ('assistant' as const) : ('user' as const),
                content: m.text,
            })),
        ];

        const completion = await groq.chat.completions.create({
            model: 'openai/gpt-oss-120b',
            messages: chatMessages,
            temperature: 1,
            max_completion_tokens: 8192,
            top_p: 1,
            stream: true,
            stop: null,
        });

        // Stream the response using ReadableStream
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of completion) {
                        const content = chunk.choices[0]?.delta?.content || '';
                        if (content) {
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                        }
                    }
                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
                } catch (err) {
                    controller.error(err);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error: any) {
        console.error('Groq API error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Failed to get AI response' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

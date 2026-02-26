import { NextRequest } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const { pitch, grants, userProfile } = await req.json();

        if (!pitch || !grants || grants.length === 0) {
            return new Response(JSON.stringify({ error: 'Missing pitch or grants data' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Build a concise grant summary for the prompt - INCLUDE ID for exact matching
        const grantSummaries = grants.map((g: any, i: number) =>
            `${i + 1}. ID="${g.id}" | "${g.title}" by ${g.agency} | Amount: ${g.amount} | Sector: ${g.sector || 'General'} | Ideal Stage: ${g.idealStage || 'Any'} | Tags: ${g.tags.join(', ')}`
        ).join('\n');

        const profileInfo = userProfile
            ? `User Profile: Venture="${userProfile.ventureName}", Stage="${userProfile.stage}", Status="${userProfile.status}", Domain="${userProfile.domain}"`
            : 'No user profile provided.';

        const systemPrompt = `You are an expert Indian government grant advisor AI. You analyze startup pitches and determine eligibility for various Indian government grants/schemes.

TASK: Analyze the startup pitch below against ALL listed grants. For EACH grant, determine:
1. Eligibility: "eligible", "partial", or "not-eligible"
2. Score: 0-100 (how well the pitch matches this grant)
3. Reason: 1-2 sentence explanation of why
4. Strategy: 2-3 sentence tailored pitch strategy to IMPROVE their chances for THIS specific grant. Be very specific — reference the grant's focus areas, keywords they should use, and what to emphasize.

${profileInfo}

STARTUP PITCH:
"${pitch}"

AVAILABLE GRANTS:
${grantSummaries}

CRITICAL: For each grant, use the EXACT "grantId" value from the ID= field shown above. Do NOT make up or modify the IDs.

RESPOND IN VALID JSON ONLY. No markdown, no explanation outside JSON. Use this exact format:
{
  "analysis": [
    {
      "grantId": "<EXACT grant id from the ID= field above>",
      "eligibility": "eligible|partial|not-eligible",
      "score": <number 0-100>,
      "reason": "<why eligible or not>",
      "strategy": "<tailored pitch improvement strategy for this grant>"
    }
  ],
  "overallSummary": "<2-3 sentence overall assessment of the startup idea and its funding potential>"
}`;

        const completion = await groq.chat.completions.create({
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Analyze this startup pitch against all ${grants.length} grants and return JSON.` }
            ],
            temperature: 0.3,
            max_completion_tokens: 4096,
            response_format: { type: 'json_object' },
        });

        const responseText = completion.choices[0]?.message?.content || '{}';

        let parsed;
        try {
            parsed = JSON.parse(responseText);
        } catch {
            // If JSON parse fails, return a fallback
            parsed = {
                analysis: grants.map((g: any) => ({
                    grantId: g.id,
                    eligibility: 'partial',
                    score: 50,
                    reason: 'Unable to analyze in detail. Please try again.',
                    strategy: 'Consider highlighting innovation and social impact in your pitch.'
                })),
                overallSummary: 'Analysis could not be completed fully. Please try again.'
            };
        }

        // Post-process: Normalize grant IDs to ensure they match our local data
        // The LLM may return slightly different IDs, so we match by title as fallback
        const grantIdMap: Record<string, string> = {};
        const grantTitleMap: Record<string, string> = {};
        grants.forEach((g: any) => {
            grantIdMap[g.id.toLowerCase()] = g.id;
            grantTitleMap[g.title.toLowerCase()] = g.id;
        });

        if (parsed.analysis && Array.isArray(parsed.analysis)) {
            parsed.analysis = parsed.analysis.map((item: any) => {
                const rawId = (item.grantId || '').toLowerCase().replace(/[\s_-]+/g, '-');
                // Try exact match first
                if (grantIdMap[rawId]) {
                    return { ...item, grantId: grantIdMap[rawId] };
                }
                // Try partial match on ID
                const matchedIdKey = Object.keys(grantIdMap).find(k => k.includes(rawId) || rawId.includes(k));
                if (matchedIdKey) {
                    return { ...item, grantId: grantIdMap[matchedIdKey] };
                }
                // Try title-based match (LLM sometimes uses title as ID)
                const matchedTitleKey = Object.keys(grantTitleMap).find(k =>
                    k.includes(rawId) || rawId.includes(k.replace(/[\s]+/g, '-'))
                );
                if (matchedTitleKey) {
                    return { ...item, grantId: grantTitleMap[matchedTitleKey] };
                }
                // If no match found, keep original
                return item;
            });

            // De-duplicate by grantId (keep first occurrence)
            const seen = new Set<string>();
            parsed.analysis = parsed.analysis.filter((item: any) => {
                if (seen.has(item.grantId)) return false;
                seen.add(item.grantId);
                return true;
            });
        }

        return new Response(JSON.stringify(parsed), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Analyze Pitch API error:', error);
        return new Response(JSON.stringify({ error: error.message || 'Failed to analyze pitch' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

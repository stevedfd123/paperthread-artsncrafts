/** Vercel serverless function: POST /api/chat */
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateReply, generateFallbackReply } from './_lib/assistant';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { messages } = req.body ?? {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  try {
    return res.status(200).json({ reply: await generateReply(messages) });
  } catch (err: any) {
    // Never leave the visitor without an answer — degrade to the canned reply.
    console.error('Gemini API error:', err);
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    return res.status(200).json({
      reply: generateFallbackReply(lastUserMessage),
      degraded: true,
    });
  }
}

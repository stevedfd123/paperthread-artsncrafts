/** Vercel serverless function: POST /api/inquiry */
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, type, interest, notes } = req.body ?? {};

  // NOTE: inquiries are only logged. Wire this up to email//a database/Sheets
  // before relying on it in production, or the submission is not persisted.
  console.log(
    `Received inquiry from ${name} (${email}) for ${type}: ${interest}. Notes: ${notes}`
  );

  return res.status(200).json({
    success: true,
    message:
      'Thank you! Your inquiry has been submitted successfully. Kavindi will contact you personally soon.',
  });
}

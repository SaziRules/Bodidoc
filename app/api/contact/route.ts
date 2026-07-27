import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  const { error: sbError } = await supabase
    .from('contact_submissions')
    .insert({ brand: 'bodidoc', name, email, message });

  if (sbError) {
    console.error('Supabase error:', sbError.message);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY!,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Bodidoc Website', email: 'noreply@bodidoc.co.za' },
      to: [
        { email: 'info@bodidoc.com', name: 'Bodidoc' },
        { email: 'info@amka.co.za', name: 'Amka' },
      ],
      replyTo: { email, name },
      subject: `New enquiry from ${name}`,
      htmlContent: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }),
  });

  if (!brevoRes.ok) {
    console.error('Brevo error:', await brevoRes.text());
  }

  return NextResponse.json({ success: true });
}

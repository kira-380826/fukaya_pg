import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // 必須項目のバリデーション
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目がすべて入力されていません。' },
        { status: 400 }
      );
    }

    // 送信先メールアドレス（デフォルトは表向きの fukawapg@gmail.com と 個人の atsushikira@gmail.com 等の双方へ送信）
    const envTarget = process.env.CONTACT_TARGET_EMAIL;
    const targetEmails = envTarget 
      ? envTarget.split(',').map(e => e.trim()).filter(Boolean)
      : ['fukawapg@gmail.com', 'atsushikira@gmail.com', 'atsushikira0826@gmail.com'];

    // メール送信設定の確認 (ResendまたはNodemailer/SMTP)
    const resendApiKey = process.env.RESEND_API_KEY;
    const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS;
    const smtpHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.EMAIL_PORT) || 465;

    const mailSubject = `【深谷PG問い合わせ】${subject} (${name}様)`;

    const textBody = `【深谷PG オフィシャルWEBサイト お問い合わせ】

お名前 / チーム名: ${name}
メールアドレス: ${email}
ご用件: ${subject}

【お問い合わせ内容】
${message}

-----------------------------------------
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
FUKAYA PG OFFICIAL WEB SITE
-----------------------------------------`;

    const htmlBody = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #101415; color: #e0e3e5; padding: 24px; border-radius: 12px; border: 1px solid #2a2e30;">
  <div style="border-bottom: 2px solid #ffd700; padding-bottom: 16px; margin-bottom: 24px;">
    <h2 style="color: #ffd700; margin: 0; font-size: 20px; font-weight: 900;">FUKAYA PG CONTACT</h2>
    <p style="color: #a0a6aa; font-size: 12px; margin: 4px 0 0 0;">オフィシャルWEBサイトより新しいお問い合わせが届きました</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    <tr>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a2e30; color: #a0a6aa; font-size: 14px; width: 140px;">お名前 / チーム名</td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a2e30; color: #ffffff; font-size: 15px; font-weight: bold;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a2e30; color: #a0a6aa; font-size: 14px;">メールアドレス</td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a2e30; color: #ffffff; font-size: 15px;"><a href="mailto:${email}" style="color: #ffd700; text-decoration: underline;">${email}</a></td>
    </tr>
    <tr>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a2e30; color: #a0a6aa; font-size: 14px;">ご用件</td>
      <td style="padding: 12px 8px; border-bottom: 1px solid #2a2e30; color: #ffffff; font-size: 15px; font-weight: bold;">${subject}</td>
    </tr>
  </table>
  <div style="background-color: #191c1e; padding: 16px; border-radius: 8px; border: 1px solid #2a2e30; margin-bottom: 24px;">
    <p style="color: #a0a6aa; font-size: 12px; margin: 0 0 8px 0; font-family: monospace;">MESSAGE CONTENT:</p>
    <p style="color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
  </div>
  <div style="border-top: 1px solid #2a2e30; padding-top: 16px; text-align: center; color: #60666a; font-size: 11px;">
    <p style="margin: 0;">FUKAYA PG OFFICIAL FOOTBALL CLUB</p>
  </div>
</div>
`;

    // 1. Resend APIキーがある場合は Resend で送信
    if (resendApiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Fukaya PG <onboarding@resend.dev>',
          to: targetEmails,
          reply_to: email,
          subject: mailSubject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.error('Resend API Error:', errorData);
        throw new Error(errorData?.message || 'Resend APIでのメール送信に失敗しました。');
      }

      return NextResponse.json({ success: true, method: 'resend' });
    }

    // 2. Nodemailer (Gmail / SMTP) での送信
    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // 465の場合はtrue、587等ならfalse
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} (深谷PG WEB)" <${gmailUser}>`,
        to: targetEmails.join(', '),
        replyTo: email,
        subject: mailSubject,
        text: textBody,
        html: htmlBody,
      });

      return NextResponse.json({ success: true, method: 'nodemailer' });
    }

    // どちらの設定も存在しない場合はエラーメッセージを返す
    console.error('Email configuration missing: Please set RESEND_API_KEY or GMAIL_USER/GMAIL_APP_PASSWORD in .env.local');
    return NextResponse.json(
      { 
        error: 'サーバーのメール送信設定（環境変数 GMAIL_USER / GMAIL_APP_PASSWORD 等）が未設定です。.env.local で設定してください。',
        code: 'MISSING_ENV'
      },
      { status: 500 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { 
        error: 'メールの送信に失敗しました。一時的なネットワークエラーか設定の可能性があります。',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

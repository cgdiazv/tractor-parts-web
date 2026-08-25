import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, category, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, Email, and Message are required fields." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not set in environment variables. Submissions logged to server console.");
      console.log("Contact Form Submission Data:", { name, email, phone, company, category, subject, message });
      return NextResponse.json({
        success: true,
        message: "Your message has been received! (Note: Set RESEND_API_KEY in .env.local to transmit live email).",
      });
    }

    const resend = new Resend(apiKey);
    const emailSubject = subject ? `[Contact Form] ${subject}` : `New Inquiry from ${name} - Tractor Parts Depot`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f5f7; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8; }
            .header { background: #0b0d10; color: #ffffff; padding: 24px; text-align: center; border-bottom: 4px solid #f87f21; }
            .header h1 { margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0 0; color: #f87f21; font-size: 13px; font-weight: bold; }
            .content { padding: 30px; }
            .field { margin-bottom: 16px; border-bottom: 1px dashed #eee; padding-bottom: 12px; }
            .label { font-weight: bold; font-size: 12px; text-transform: uppercase; color: #666; margin-bottom: 4px; display: block; }
            .value { font-size: 15px; color: #111; }
            .message-box { background: #f8f9fa; border-left: 4px solid #f87f21; padding: 15px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 20px; border-radius: 4px; }
            .footer { background: #f4f5f7; padding: 15px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e1e4e8; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Tractor Parts Depot</h1>
              <p>New Contact Form Inquiry</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Full Name</span>
                <span class="value">${name}</span>
              </div>
              <div class="field">
                <span class="label">Email Address</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              ${phone ? `
              <div class="field">
                <span class="label">Phone / WhatsApp</span>
                <span class="value">${phone}</span>
              </div>` : ""}
              ${company ? `
              <div class="field">
                <span class="label">Company / Business</span>
                <span class="value">${company}</span>
              </div>` : ""}
              ${category ? `
              <div class="field">
                <span class="label">Inquiry Category</span>
                <span class="value">${category}</span>
              </div>` : ""}
              
              <div class="label" style="margin-top: 20px;">Message Details</div>
              <div class="message-box">${message}</div>
            </div>
            <div class="footer">
              Sent via Tractor Parts Depot Website Contact Form
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: "Tractor Parts Depot <notifications@indevasa.com>",
      to: ["info@tractorpartsdepot.us"],
      replyTo: email,
      subject: emailSubject,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend Email Error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
      data,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal Server Error";
    console.error("Contact API Exception:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

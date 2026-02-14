import { type NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const subject = (data.subject || "").trim();
    const message = (data.message || "").trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isEmail) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check if BREVO_API_KEY is available
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      console.error("BREVO_API_KEY is not configured");
      return NextResponse.json(
        { message: "Email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    // Send email using Brevo API
    const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Portfolio Contact Form",
          email: "noreply@poza.dev",
        },
        to: [
          {
            email: "kpozadev@gmail.com",
            name: "Poza",
          },
        ],
        subject: `Portfolio Contact: ${subject}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Message:</h3>
              <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #007bff; border-radius: 3px;">
                ${message.replace(/\n/g, "<br>")}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 12px;">
              <p>This message was sent from your portfolio contact form.</p>
              <p>Reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        `,
        replyTo: {
          email: email,
          name: name,
        },
      }),
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { message: "Failed to send email. Please review email" },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          name: "Poza",
          email: "noreply@poza.dev",
        },
        to: [
          {
            email: email,
            name: name,
          },
        ],
        subject: "Thanks for reaching out!",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #007bff; margin: 0; font-size: 28px;">Thanks for reaching out!</h1>
              <div style="width: 50px; height: 3px; background-color: #007bff; margin: 15px auto;"></div>
            </div>
            
            <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Hi ${name},
              </p>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                Thank you for contacting me through my portfolio! I've received your message about "<strong>${subject}</strong>" and I'm excited to connect with you.
              </p>
              
              <div style="background-color: #e3f2fd; padding: 20px; border-radius: 5px; border-left: 4px solid #007bff; margin: 20px 0;">
                <p style="color: #1565c0; margin: 0; font-style: italic;">
                  "I believe great projects start with great conversations. Looking forward to discussing how we can work together!"
                </p>
              </div>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                I typically respond within 24 hours, so you should hear back from me soon. In the meantime, feel free to:
              </p>
              
              <ul style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                <li style="margin-bottom: 8px;">Check out my <a href="https://pozadev.vercel.app/projects" style="color: #007bff; text-decoration: none;">latest projects</a></li>
                <li style="margin-bottom: 8px;">Connect with me on <a href="https://x.com/KvnqPoza" style="color: #007bff; text-decoration: none;">Twitter</a></li>
                <li style="margin-bottom: 8px;">Follow my journey on <a href="https://github.com/Kvnq-Poza" style="color: #007bff; text-decoration: none;">GitHub</a></li>
              </ul>
              
              <p style="color: #333; font-size: 16px; line-height: 1.6; margin-bottom: 0;">
                Best regards,<br>
                <strong style="color: #007bff;">Poza</strong><br>
                <span style="color: #6c757d; font-size: 14px;">Software Developer</span>
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6;">
              <p style="color: #6c757d; font-size: 12px; margin: 0;">
                This is an automated confirmation email. Please don't reply to this message.
              </p>
            </div>
          </div>
        `,
      }),
    });

    return NextResponse.json(
      { ok: true, message: "Message received. Thank you!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

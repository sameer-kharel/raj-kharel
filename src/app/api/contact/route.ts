import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, message, preferredDate, preferredTime } = data;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Check if this is a meeting request or general contact
    if (preferredDate && preferredTime) {
      // MEETING REQUEST
      const meetingDate = new Date(preferredDate);
      const formattedDate = meetingDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });

      const calendarDate = preferredDate.replace(/-/g, '');
      const timeForCalendar = preferredTime.replace(/[:\s]/g, '').replace('AM', '').replace('PM', '');
      const calendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Meeting+with+${encodeURIComponent(name)}&dates=${calendarDate}T${timeForCalendar}00/${calendarDate}T${timeForCalendar}00&details=${encodeURIComponent(message)}&location=Virtual+Meeting&sf=true&output=xml`;

      
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'kharelrealty@gmail.com',
        subject: `🗓️ New Meeting Request from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #3b82f6; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">New Meeting Request</h1>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Client Information</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0;"><strong style="color: #3b82f6;">Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong style="color: #3b82f6;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #3b82f6;">Phone:</strong> ${phone || 'Not provided'}</p>
              </div>
              
              <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 30px;">Preferred Meeting Time</h2>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #3b82f6;">
                <p style="margin: 8px 0; font-size: 18px;"><strong> Date:</strong> ${formattedDate}</p>
                <p style="margin: 8px 0; font-size: 18px;"><strong> Time:</strong> ${preferredTime}</p>
              </div>
              
              <h3 style="color: #1e293b; margin-top: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Message / Property Details</h3>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 15px;">
                <p style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="margin-top: 30px; text-align: center;">
                <a href="${calendarLink}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                 Add to Google Calendar
                </a>
              </div>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <h4 style="color: #1e293b; margin-bottom: 10px;">Next Steps:</h4>
                <ol style="color: #64748b; line-height: 1.8;">
                  <li>Review the meeting request</li>
                  <li>Check your availability for the requested time</li>
                  <li>Click "Add to Google Calendar" to create the event</li>
                  <li>Reply to ${email} to confirm or suggest alternative times</li>
                </ol>
              </div>
            </div>
          </div>
        `,
      });

      // Confirmation email to client
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Meeting Request Received - Kharel Realty`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #3b82f6; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">Thank You, ${name}!</h1>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Your Meeting Request Has Been Received</h2>
              
              <p style="color: #334155; line-height: 1.6; font-size: 16px;">
                Thank you for reaching out! I've received your meeting request for:
              </p>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                <p style="margin: 8px 0; font-size: 18px;"><strong> Date:</strong> ${formattedDate}</p>
                <p style="margin: 8px 0; font-size: 18px;"><strong> Time:</strong> ${preferredTime}</p>
              </div>
              
              <h3 style="color: #1e293b; margin-top: 25px;">What Happens Next?</h3>
              
              <ol style="color: #334155; line-height: 1.8; padding-left: 20px;">
                <li style="margin-bottom: 10px;">I'll review your request and check my availability</li>
                <li style="margin-bottom: 10px;">You'll receive a <strong>Google Calendar invite</strong> via email to confirm the meeting</li>
                <li style="margin-bottom: 10px;">If I'm not available at the requested time, I'll suggest alternative times</li>
                <li>Please accept the calendar invite to finalize our meeting</li>
              </ol>
              
              <p style="color: #334155; line-height: 1.6; margin-top: 20px;">
                I look forward to discussing your real estate needs! If you have any urgent questions, feel free to call me at <strong>(571) 244-1254</strong>.
              </p>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="color: #64748b; font-size: 14px; margin-bottom: 10px;">Best regards,</p>
                <p style="color: #1e293b; font-size: 18px; font-weight: bold; margin: 0;">Raj Kharel</p>
                <p style="color: #64748b; font-size: 14px; margin-top: 5px;">DMV Real Estate Expert</p>
              </div>
            </div>
          </div>
        `,
      });

    } else {
      // GENERAL CONTACT MESSAGE
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'kharelrealty@gmail.com',
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #3b82f6; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">New Contact Form Message</h1>
            </div>
            
            <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Contact Details</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 10px 0;"><strong style="color: #3b82f6;">Name:</strong> ${name}</p>
                <p style="margin: 10px 0;"><strong style="color: #3b82f6;">Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
                <p style="margin: 10px 0;"><strong style="color: #3b82f6;">Phone:</strong> ${phone || 'Not provided'}</p>
              </div>
              
              <h3 style="color: #1e293b; margin-top: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Message</h3>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-top: 15px;">
                <p style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
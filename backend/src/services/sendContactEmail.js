const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendContactEmails = async (data) => {
  // Client confirmation
  await resend.emails.send({
    from: "Brenda <no-reply@updates.romanbrendaviola.com>",
    to: data.email,
    subject: "Thanks for reaching out",
    html: `
      <p>Hi ${data.name},</p>
      <p>Thank you for your message. I’ve received it and will get back to you within 24 hours.</p>
      <p><strong>Your message:</strong><br/>${data.message}</p>
      <br/>
      <p>Warm regards,<br/>Brenda</p>
    `,
  });

  // Admin notification
  await resend.emails.send({
    from: "Website Contacts <no-reply@updatesromanbrendaviola.com>",
    to: "hello@romanbrendaviola.com",
    subject: "New Contact Message",
    html: `
      <h3>New Contact Submission</h3>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone || "N/A"}</li>
        <li><strong>Service:</strong> ${data.service || "Not specified"}</li>
      </ul>
      <p><strong>Message:</strong><br/>${data.message}</p>
    `,
  });
};

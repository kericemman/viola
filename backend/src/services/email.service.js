const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendBookingEmail = async (email, name) => {
  await resend.emails.send({
    from: "Brenda <no-reply@brenda.com>",
    to: email,
    subject: "Your session is confirmed",
    html: `
      <p>Hi ${name},</p>
      <p>Your booking has been confirmed successfully.</p>
      <p>Brenda will reach out shortly with next steps.</p>
      <br/>
      <p>Warm regards,<br/>Brenda</p>
    `,
  });
};

exports.sendAdminNotification = async (booking) => {
  await resend.emails.send({
    from: "System <no-reply@brenda.com>",
    to: "admin@brenda.com",
    subject: "New Paid Booking",
    html: `
      <p>New booking confirmed:</p>
      <ul>
        <li>Name: ${booking.name}</li>
        <li>Email: ${booking.email}</li>
        <li>Status: ${booking.paymentStatus}</li>
      </ul>
    `,
  });
};

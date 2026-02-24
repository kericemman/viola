const Subscriber = require("../models/Subscriber");
const { Resend } = require("resend");
const socialLinks = require("../config/socialLinks");

const resend = new Resend(process.env.RESEND_API_KEY);

// Public: subscribe + auto-reply
exports.subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const subscriber = await Subscriber.findOneAndUpdate(
      { email },
      { isActive: true },
      { upsert: true, new: true }
    );

    // 🔔 Auto welcome email
    await resend.emails.send({
      from: "Roman Brenda <no-reply@updates.romanbrendaviola.com>",
      to: email,
      subject: "Welcome to the Brenda Newsletter 🌱",
      html: `
        <p>Hello,</p>

        <p>Thank you for subscribing to the <strong>Brenda Newsletter</strong>.</p>

        <p>You’ll receive thoughtful insights on:</p>
        <ul>
          <li>Career growth & transitions</li>
          <li>Personal development & self-leadership</li>
          <li>People & workplace practices</li>
        </ul>

        <p><strong>What to expect:</strong></p>
        <ul>
          <li>Occasional emails (no spam)</li>
          <li>Practical, human-centered guidance</li>
          <li>Updates on programs, services, and resources</li>
        </ul>

        <p>You can also stay connected here:</p>
        <ul>
          <li><a href="${socialLinks.linkedin}">LinkedIn</a></li>
          <li><a href="${socialLinks.instagram}">Instagram</a></li>
          <li><a href="${socialLinks.twitter}">X (Twitter)</a></li>
          <li><a href="${socialLinks.website}">Website</a></li>
        </ul>

        <p>If you ever wish to unsubscribe, you can reply to this email or use the link provided in future messages.</p>

        <br/>
        <p>Warm regards,<br/>
        <strong>Brenda</strong></p>
      `,
    });

    res.status(201).json({ message: "Subscribed successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid email" });
  }
};

// Admin: list subscribers
exports.getSubscribers = async (req, res) => {
  const subscribers = await Subscriber.find({ isActive: true });
  res.json(subscribers);
};

// Admin: send bulk email
exports.sendNewsletter = async (req, res) => {
  const { subject, html } = req.body;

  const subscribers = await Subscriber.find({ isActive: true });
  const emails = subscribers.map((s) => s.email);

  if (!emails.length) {
    return res.status(400).json({ message: "No subscribers" });
  }

  await resend.emails.send({
    from: "Roman Brenda <no-reply@updates.romanbrendaviola.com>",
    to: emails,
    subject,
    html: `
      ${html}
      <br/><br/>
      <hr/>
      <p style="font-size:12px;color:#666;">
        Follow Brenda:
        <a href="${socialLinks.linkedin}">LinkedIn</a> |
        <a href="${socialLinks.instagram}">Instagram</a> |
        <a href="${socialLinks.twitter}">Facebook</a>
      </p>
    `,
  });

  res.json({ message: "Newsletter sent successfully" });
};

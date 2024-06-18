import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = twilio(accountSid, authToken);

export default async function handler(req, res) {
  const { phone } = req.body;

  try {
    const verification = await client.verify.v2.services(serviceSid)
      .verifications
      .create({ to: phone, channel: 'sms' });

    res.status(200).json({ message: 'OTP sent successfully', verification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
}

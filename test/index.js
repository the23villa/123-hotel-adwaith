const express = require("express");
const cors = require("cors");
const accountSid = "ACc8b6ccea77fc6c026e7c389d3124b038";
const authToken = "12b0b3f662385aef050d53b3b35bcaa9";
const serviceSid = "VAf8c1e2c2048382f03cf57b7a46474355";
const client = require("twilio")(accountSid, authToken);

const app = express();

app.use(express.json());
app.use(cors());

const verifyOTPWithTwilio = async (phoneNumber, code) => {
  try {
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phoneNumber, code: code });
    console.log(verificationCheck);
    return verificationCheck;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

app.post("/otpVerify", async (req, res) => {
  const { phone, otpCode } = req.body;

  try {
    const data = await verifyOTPWithTwilio(phone, otpCode);
    console.log("data", data);
    res.status(200).json({ message: "Successfully Verified", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
});

app.listen(8000, () => console.log("server ready at 8000"));

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();


app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

app.post("/send-id", async (req, res) => {
  const { email, userId } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "toxic211205@gmail.com",
        pass: "vbvm pfzl olpa kauw"
      }
    });

    let info = await transporter.sendMail({
      from: '"MyApp" <toxic211205@gmail.com>',
      to: email,
      subject: "Your User ID",
      text: `Hello, Here Is Your ID: ${userId}`
    });

    console.log("✅ Email yuborildi:", info.messageId);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Email yuborilmadi:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server http://localhost:3000 da ishlayapti");
});

//AI yordamida qilingan 
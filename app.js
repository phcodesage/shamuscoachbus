require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port
const path = require('path');
const cors = require('cors');

// Allow CORS for your specified domain
app.use(cors({
  origin: "https://www.shamuscoachbus.com"
}));

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static(path.join(__dirname)));

// Validation middleware
const validateContact = [
    body('firstName').isLength({ min: 2 }).withMessage('Name is too short.'),
    body('email').isEmail().withMessage('Enter a correct e-mail.'),
    body('message').isLength({ min: 2 }).withMessage('Message is too short.')
];

app.get('/contact_me', (req, res) => {
    res.send('Contact Me page accessed via GET request.');
});

app.get('/', (req, res) => {
    res.send('Welcome to the Shamus Coach Bus API!'); 
});

app.post('/contact_me', validateContact, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, phone, subject, message, tripInfo, departureDate, returnDate } = req.body;

    // Compose the email message
    let full_message = `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}\nTrip Info: ${tripInfo}\nDeparture Date: ${departureDate}\nReturn Date: ${returnDate}`;

    // Setup Nodemailer transport
    const transporter = nodemailer.createTransport({
        host: 'shamuscoachbus.com',
        port: 465,
        secure: true,
        auth: {
            user: 'contact@shamuscoachbus.com',
            pass: process.env.EMAIL_PASSWORD // It's safer to use environment variables!
        }
    });

    // Email options
    const mailOptions = {
        from: '"Shamus Coach Bus" <contact@shamuscoachbus.com>', // Sender address
        to: 'rechcel@memelope.com', // Replace with recipient email
        subject: subject,
        text: full_message
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.json({ status: 1, message: `Hello ${firstName}, thank you for your message.` });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ status: 0, message: "Could not send mail! Please check your Node.js mail configuration." });
    }
});

app.listen(port, () => {
    console.log(`API server running on port ${port}`);
});

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-receipt', (req, res) => {
    const { userName, date, time, place } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'java110803@gmail.com', // Replace with your email
            pass: 'angalamatngpagong'   // Replace with your email password or app password
        }
    });

    const mailOptions = {
        from: 'java110803@gmail.com', // Replace with your email
        to: 'killuashtryke@gmail.com', // Send to yourself
        subject: 'Valentine\'s Day Receipt',
        html: `
            <h2>See you!</h2>
            <p>Name: ${userName}</p>
            <p>Date: ${date}</p>
            <p>Time: ${time}</p>
            <p>Place: ${place}</p>
            <p>Thank you for being my Valentine!</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

app.get('/test-email', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'java110803@gmail.com', // Replace with your email
            pass: 'angalamatngpagong'   // Replace with your email password or app password
        }
    });

    const mailOptions = {
        from: 'java110803@gmail.com', // Replace with your email
        to: 'killuashtryke@gmail.com', // Send to yourself
        subject: 'Test Email',
        text: 'This is a test email.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        res.send('Test email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
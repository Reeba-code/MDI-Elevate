const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.json());

const accountSid = ' SK8b92dc81eab5d3847a78805fc2bc527e';
const authToken = 'c3c0d4361901f96f9a163459ed7b673e';
const client = twilio(accountSid, authToken);

app.post('/payment', (req, res) => {
    const paymentDetails = req.body;

    // Process payment here

    // If payment is successful
    const paymentSuccessful = true; // Replace with actual payment success check
    if (paymentSuccessful) {
        client.messages
            .create({
                from: '0636601370',
                to: paymentDetails.0795598051,
                body: 'Payment successful! Thank you for your purchase.'
            })
            .then(message => {
                console.log(`SMS sent: ${message.sid}`);
                res.json({ status: 'success' });
            })
            .catch(error => {
                console.error('Error sending SMS:', error);
                res.json({ status: 'error', message: 'Payment successful but SMS sending failed.' });
            });
    } else {
        res.json({ status: 'error', message: 'Payment failed.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'adminsupport@gmail.com',
        pass: 'digital@2021',
    },
    from: 'adminsupport@gmail.com',
    secure: true,
});

route.post('/email', (req, res) => {
    const { to, subject, text, name, surname } = req.body;
    console.log(req.body);
    const mailData = {
        from: 'adminsupport@gmail.com',
        to: to,
        subject: subject,
        text: text,
        html: `<b>Hey ${name} ${surname}</b><br> ${text}<br/>`,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

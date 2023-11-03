import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import nodemailer from 'nodemailer';

async function handler(req, res) {
  //post request
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    //validation functions
    function isValidName(name) {
      return name.trim() !== "";
    }

    function isValidEmail(email) {
    // Use a regular expression to validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailPattern.test(email);
    }

    function isValidMessage(message) {
      return message.trim() !== "";
    }

    //Server side validation
    if (
      !name || !isValidName(name) ||
    !email || !isValidEmail(email) ||
    !message || !isValidMessage(message)
    ) {
      console.log(name);
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { name, email, message }; //{ name: name, email: email, message: message };

    const transporter = nodemailer.createTransport({
            service: 'zoho',
            host: 'smtpro.zoho.in',
            port: 465,
            secure: true,
            auth: {
                user: 'info@techonsolutions.com',
                pass: process.env.TECHONSOLUTIONS_EMAIL_PSWD
            }
        });

    const mailOption = {
            from: "info@techonsolutions.com",
            to: "techonsolutions@yahoo.com",
            subject: "New Message",
            text: `
              Name: ${details.name}
              Email: ${details.email}
              Message: ${details.message}
            `,
    };

    const mailOptionUser = {
            from: "info@techonsolutions.com",
            to: `${details.email}`,
            subject: "Message to Techonsolutions",
            text: `
Hi ${details.name} ,
              
We have received your message. Our Team is working around the clock to deliver a seamless experince to our Clientele. We will give you feedback at our earliest convinience. Thank you for your patience and choosing Techonsolutions as your IT partner.

If you have any concern or queries you can reach to to us through Phone call, Text Message, WhatsApp messanger on +254 705933595 or email us on info@techonsolutions.com.
              
Techonsolutions.
Regards.
            `,
    };

    let client;

    try {
      // const client = await MongoClient.connect(
      //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
      // );
      const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json(
        // { message: error.message },
        { message: "Could not connect to database" }
      );

      return;
    }

    const db = client.db();

    const messagecount = await db
      .collection("messagedetails")
      .countDocuments({ email: email });

    if (messagecount > 1) {
      res.status(422).json({ message: "Kindly wait for a response" });
      client.close();
      return;
    }

    // Send an email with the message details

    try {
      await transporter.sendMail(mailOption);
      await transporter.sendMail(mailOptionUser);

      //res.status(201).json({ message: "Email Sent" });
    }catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Couldn't send email" });
    }

    // Save message to the database

    try {
      const result = await db.collection("messagedetails").insertOne(details);
      details.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Message not sent!!" });
      return;
    }

    client.close();

    res.status(201).json({ message: "Sent" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    let client;

    try {
      // const client = await MongoClient.connect(
      //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
      // );
      const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json(
        // { message: error.message },
        { message: "Could not connect to database" }
      );

      return;
    }

    const db = client.db();
    try {
      const data = await db
        .collection("messagedetails")
        .deleteOne({ _id: ObjectId(id) });

      res.status(200).json({ message: "Deleted" });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Deleting failed!!" });
      return;
    }

    client.close();
  }
}
export default handler;

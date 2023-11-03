import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import nodemailer from 'nodemailer';

async function handler(req, res) {
  //post request

  if (req.method === "POST") {
    const { name, email, phone, company, description } = req.body;

    //validation functions
    function isValidName(name) {
      return name.trim() !== "";
    }

    function isValidEmail(email) {
    // Use a regular expression to validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailPattern.test(email);
    }

    function isValidPhoneNumber(phone) {
    // Use a regular expression to validate phone number format
    const phonePattern = /^\+\d{1,3} \d{9,15}$/;
      return phonePattern.test(phone);
    }

    function isValidDescription(description) {
      return description.trim() !== "";
    }

    //Server side validation
    if (
      !name || !isValidName(name) ||
    !email || !isValidEmail(email) ||
    !phone || !isValidPhoneNumber(phone) ||
    !description || !isValidDescription(description)
    ) {
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { name, email, phone, company, description }; //{ name: name, email: email, message: message };

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
            subject: "New Quotation Request",
            text: `
              Name: ${details.name}
              Email: ${details.email}
              Phone: ${details.phone}
              Company: ${details.company}
              Description: ${details.description}
            `,
    };

     const mailOptionUser = {
            from: "info@techonsolutions.com",
            to: `${details.email}`,
            subject: "Quotation Request to Techonsolutions",
            text: `
Hi ${details.name} ,
              
We have received your Quotation request. Our Team is working around the clock to deliver a seamless experince to our Clientele. We will give you feedback at our earliest convinience. Thank you for your patience and choosing Techonsolutions as your IT partner. If you have any concern or queries you can reach to to us through Phone call, Text Message, WhatsApp messenger on +254 705933595 or email us on info@techonsolutions.com.
              
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

    const quotationcount = await db
      .collection("quotationdetails")
      .countDocuments({ email: email });

    if (quotationcount > 1) {
      res.status(422).json({ message: "Kindly wait for a response" });
      client.close();
      return;
    }

     // Send an email with the quotation details

    try {
      await transporter.sendMail(mailOption);
      await transporter.sendMail(mailOptionUser);

      //res.status(201).json({ message: "Email Sent" });
    }catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Couldn't send email" });
    }

    // Save quote to the database
    
    try {
      const result = await db.collection("quotationdetails").insertOne(details);
      details.id = result.insertedId;

      res.status(201).json({ message: "Sent" });
    }catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

    // Send feedback email to the user

    //try {
      //await transporter.sendMail(mailOptionUser);

      //res.status(201).json({ message: "Email Sent" });
    //}catch (error) {
      //console.error("An error occurred:", error);
      //res.status(500).json({ message: "Couldn't send email" });
    //}
  }

  //delete request
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
        .collection("quotationdetails")
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

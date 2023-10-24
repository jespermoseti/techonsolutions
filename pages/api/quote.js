import { MongoClient } from "mongodb";
import { ObjectId } from "bson";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

async function handler(req, res) {
  //post request
  if (req.method === "POST") {
    const { name, email, phone, company, description } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !email.includes("@") ||
      !phone ||
      phone.trim() === "" ||
      phone.length > 14 ||
      !description ||
      description.trim() === ""
    ) {
      console.log(name);
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { name, email, phone, company, description }; //{ name: name, email: email, message: message };

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

    try {
      const result = await db.collection("quotationdetails").insertOne(details);
      details.id = result.insertedId;

      // Send an email with the quotation details
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@example.com",
    subject: "New Quotation Request",
    text: `
      Name: ${details.name}
      Email: ${details.email}
      Phone: ${details.phone}
      Company: ${details.company}
      Description: ${details.description}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Not sent!!" });
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

import { MongoClient } from "mongodb";
import ObjectId, { ObjectID } from "bson";

async function handler(req, res) {
  if (req.method === "POST") {
    const { about } = req.body;

    if (!about || about.trim() === "") {
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { about };

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
      const result = await db.collection("aboutdetails").insertOne(details);
      details.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing details failed!!" });
      return;
    }

    res.status(201).json({ message: "Successifully stored" });
    client.close();
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
        .collection("aboutdetails")
        .deleteOne({ _id: ObjectID(id) });

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Deleting failed!!" });
      return;
    }

    client.close();
  }

  //get request
  if (req.method === "GET") {
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
      const data = await db.collection("personaldetails").find().toArray();

      res.status(200).json({ info: data });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Reading data failed!!" });
      return;
    }

    client.close();
  }
}

export default handler;

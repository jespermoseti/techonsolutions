import { MongoClient } from "mongodb";
import { ObjectId } from "bson";

async function handler(req, res) {
  //post request
  if (req.method === "POST") {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      res.status(422).json({ message: "INVALID INPUT" });
      return;
    }

    const details = { description };

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
        { message: "could not connect to database" }
      );

      return;
    }

    const db = client.db();
    try {
      const result = await db
        .collection("descriptiondetails")
        .insertOne(details);
      details.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing details failed!!" });
      return;
    }

    res.status(201).json({ message: "Successifully saved" });
    client.close();
  }

  //delete request
  if (req.method === "DELETE") {
    const id = req.body.id;

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
        .collection("descriptiondetails")
        .deleteOne({ _id: ObjectId(id) });

      // res.status(200).json({ message: "deleted successfully" });
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Deleting failed!!" });
      return;
    }

    res.status(200).json({ message: "Deleted successfully" });
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

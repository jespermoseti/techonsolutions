import { MongoClient } from "mongodb";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    // jwt: true,
    strategy: "jwt", //| "database" //on nextauth v4
    maxAge: 60 * 60 * 2,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // const client = await MongoClient.connect(
        //   "mongodb+srv://<username>:<password>@<clustername>.ibpnt47.mongodb.net/<database>?retryWrites=true&w=majority"
        // );

        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ibpnt47.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
        const client = await MongoClient.connect(connectionString);

        const db = client.db();

        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

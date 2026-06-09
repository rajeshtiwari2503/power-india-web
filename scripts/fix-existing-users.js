/**
 * Agar login 401 de raha hai existing users pe, yeh MongoDB command run karo:
 *
 * MongoDB Atlas Shell ya Compass mein:
 */

// Yeh command MongoDB shell mein run karo:
// db.users.updateMany({ isRegistered: { $ne: true } }, { $set: { isRegistered: true } })

// Ya Node.js se:
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: ".env.local" });

async function fix() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const db    = client.db();
  const users = db.collection("users");

  const result = await users.updateMany(
    { isRegistered: { $ne: true } },
    { $set: { isRegistered: true } }
  );

  console.log(`✅  Fixed ${result.modifiedCount} users — isRegistered set to true`);
  await client.close();
}

fix().catch(console.error);

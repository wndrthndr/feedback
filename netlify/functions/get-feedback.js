const { MongoClient } = require('mongodb');
require('dotenv').config();

exports.handler = async () => {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db('feedbackdb');
    const collection = db.collection('feedbacks');
    const feedbacks = await collection.find().sort({ timestamp: -1 }).toArray();
    return {
      statusCode: 200,
      body: JSON.stringify(feedbacks),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  } finally {
    await client.close();
  }
};
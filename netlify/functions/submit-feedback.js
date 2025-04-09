const { MongoClient } = require('mongodb');
require('dotenv').config();

exports.handler = async (event) => {
  const client = new MongoClient(process.env.MONGO_URI);
  const data = JSON.parse(event.body);
  const timestamp = new Date();

  try {
    await client.connect();
    const db = client.db('feedbackdb');
    const collection = db.collection('feedbacks');
    await collection.insertOne({ ...data, timestamp });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' }),
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

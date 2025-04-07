// 📁 netlify/functions/get-feedbacks.js
const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const filePath = path.join(__dirname, 'feedback.json');

  try {
    if (!fs.existsSync(filePath)) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    const data = fs.readFileSync(filePath);
    return {
      statusCode: 200,
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to read feedbacks.' }),
    };
  }
};

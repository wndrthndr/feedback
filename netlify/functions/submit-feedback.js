// 📁 netlify/functions/submit-feedback.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);
  const newFeedback = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  const filePath = path.join(__dirname, 'feedback.json');

  try {
    let feedbacks = [];
    if (fs.existsSync(filePath)) {
      feedbacks = JSON.parse(fs.readFileSync(filePath));
    }

    feedbacks.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(feedbacks, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Feedback saved successfully.' }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save feedback.' }),
    };
  }
};

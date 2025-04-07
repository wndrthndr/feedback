import React from 'react';

export default function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) return <p>No feedback submitted yet.</p>;
  return (
    <div className="space-y-4">
      {feedbacks.map((fb, i) => (
        <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
          <p className="font-semibold text-lg">{fb.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{fb.email}</p>
          <p className="my-2">{fb.message}</p>
          <p className="text-xs text-right text-gray-400">🕒 {new Date(fb.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [showFeedbackPage, setShowFeedbackPage] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', saved === 'dark');
    setTheme(saved);
  }, []);

  useEffect(() => {
    if (showFeedbackPage) {
      const fetchData = async () => {
        const res = await fetch('/.netlify/functions/get-feedbacks');
        const data = await res.json();
        setFeedbacks(data);
      };
      fetchData();
    }
  }, [showFeedbackPage]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans transition-colors duration-300 px-4 py-6">
      <div className="max-w-2xl mx-auto bg-[var(--card)] rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold"> Feedback Collector</h1>
          <button
            onClick={toggleTheme}
            className="bg-[var(--primary)] text-white px-3 py-1 rounded-lg hover:opacity-90"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        {!showFeedbackPage ? (
          <>
            <button
              onClick={() => setShowFeedbackPage(true)}
              className="mb-4 w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-900 font-semibold"
            >
              📋 View Submitted Feedback
            </button>
            <FeedbackForm />
          </>
        ) : (
          <>
            <button
              onClick={() => setShowFeedbackPage(false)}
              className="mb-4 w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
            >
              ← Back to Form
            </button>
            <FeedbackList feedbacks={feedbacks} />
          </>
        )}

        <footer className="mt-8 text-center text-sm opacity-70">
          Built by <strong>Vishal</strong> – Feedback Collector
        </footer>
      </div>
    </div>
  );
}
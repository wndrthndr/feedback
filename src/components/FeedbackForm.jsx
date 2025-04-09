import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'feedbacks'), {
        name,
        email,
        message,
        timestamp: serverTimestamp(),
      });
      setName('');
      setEmail('');
      setMessage('');
      setShowPopup(true);

      // Auto-close popup after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error('Submission failed', err);
      alert('Submission failed!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-[var(--card)] text-[var(--text)]"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-[var(--card)] text-[var(--text)]"
        />
        <textarea
          placeholder="Your Feedback"
          value={message}
          required
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-[var(--card)] text-[var(--text)]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-800 font-semibold"
        >
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowPopup(false)} // dismiss on click
        >
          <div className="bg-black border border-green-500 text-green-400 px-6 py-4 rounded-xl shadow-xl text-lg font-semibold">
            ✅ Feedback Submitted!
          </div>
        </div>
      )}
    </>
  );
}

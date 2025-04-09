import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fb = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeedbacks(fb);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) return <p className="text-center opacity-70">Loading feedbacks...</p>;

  return (
    <div className="space-y-4 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-2 text-[var(--text)]">📋 Submitted Feedback</h2>
      {feedbacks.length === 0 ? (
        <p className="opacity-70 text-[var(--text)]">No feedbacks yet.</p>
      ) : (
        feedbacks.map(fb => (
          <div
            key={fb.id}
            className="p-4 border rounded-xl bg-[var(--card)] text-[var(--text)] shadow transition-colors"
          >
            <h3 className="font-bold text-lg">{fb.name}</h3>
            <p className="mt-1">{fb.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

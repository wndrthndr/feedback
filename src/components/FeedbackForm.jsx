import React, { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('⚠️ Please fill in all fields.');
      return;
    }

    setLoading(true);
    setStatus('');

    const res = await fetch('/.netlify/functions/submit-feedback', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      setFormData({ name: '', email: '', message: '' });
      setStatus('✅ Feedback submitted!');
    } else {
      setStatus('❌ Submission failed.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        onChange={handleChange}
        value={formData.email}
      />
      <textarea
        name="message"
        placeholder="Your Feedback"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        onChange={handleChange}
        value={formData.message}
      ></textarea>
      <button
        type="submit"
        className="bg-[var(--primary)] w-full text-white py-2 rounded-lg hover:opacity-90"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {status && <p className="text-sm text-center font-medium">{status}</p>}
    </form>
  );
}

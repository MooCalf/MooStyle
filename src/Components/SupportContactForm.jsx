import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Send } from 'lucide-react';

export const SupportContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/xqaygypb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          category: formData.category,
          message: formData.message,
          priority: formData.priority,
          _replyto: formData.email,
          _subject: `[${formData.priority.toUpperCase()}] Support Request: ${formData.subject}`,
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'general',
          message: '',
          priority: 'medium'
        });
      } else {
        setSubmitStatus('error');
        console.error('Formspree submission error:', response.status);
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Formspree submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-form">
      <h2 className="mod-detail__section-heading support-form__heading">Send us a message</h2>

      {submitStatus === 'success' && (
        <div className="support-form__status support-form__status--success">
          <CheckCircle size={20} aria-hidden="true" />
          <p>Your message has been sent. We'll get back to you within 24-48 hours.</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="support-form__status support-form__status--error">
          <AlertCircle size={20} aria-hidden="true" />
          <p>There was an error sending your message. Please try again or email us directly.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="support-form__form">
        <div className="support-form__row">
          <div className="support-form__field">
            <label className="support-form__label" htmlFor="support-form-name">Full Name *</label>
            <input
              id="support-form-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="support-form__input"
              placeholder="Enter your full name"
            />
          </div>

          <div className="support-form__field">
            <label className="support-form__label" htmlFor="support-form-email">Email Address *</label>
            <input
              id="support-form-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="support-form__input"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className="support-form__row">
          <div className="support-form__field">
            <label className="support-form__label" htmlFor="support-form-subject">Subject *</label>
            <input
              id="support-form-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="support-form__input"
              placeholder="Brief description of your issue"
            />
          </div>

          <div className="support-form__field">
            <label className="support-form__label" htmlFor="support-form-category">Category</label>
            <select
              id="support-form-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="support-form__input"
            >
              <option value="general">General Support</option>
              <option value="technical">Technical Support</option>
              <option value="business">Business Query</option>
              <option value="query">General Query</option>
            </select>
          </div>
        </div>

        <div className="support-form__field">
          <label className="support-form__label" htmlFor="support-form-message">Message *</label>
          <textarea
            id="support-form-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="support-form__input support-form__textarea"
            placeholder="Please provide detailed information about your issue or question..."
          />
        </div>

        <div className="support-form__submit-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="support-form__submit"
          >
            {isSubmitting ? (
              <>
                <span className="support-form__spinner" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send size={16} aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

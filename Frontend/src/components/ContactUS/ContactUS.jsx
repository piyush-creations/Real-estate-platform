import React, { useState } from 'react';
import { Phone, Mail, User, MessageSquare, Send } from 'lucide-react';

const ContactNowPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Thank you for your inquiry! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-containers9">
      <div className="contact-wrappers9">
        {/* Header */}
        <div className="contact-headers9">
          <h1 className="contact-titles9">Contact Us</h1>
          <p className="contact-subtitles9">Get in touch for property inquiries</p>
        </div>

        {/* Contact Form */}
        <div className="contact-form-cards9">
          <div className="form-containers9">
            {/* Name Field */}
            <div className="form-groups9">
              <label className="form-labels9">Full Name</label>
              <div className="input-wrappers9">
                <User className="input-iconss9" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-inputss9"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-groups9">
              <label className="form-labels9">Email Address</label>
              <div className="input-wrappers9">
                <Mail className="input-iconss9" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-inputss9"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="form-groups9">
              <label className="form-labels9">Phone Number</label>
              <div className="input-wrappers9">
                <Phone className="input-iconss9" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-inputss9"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Message Field */}
            <div className="form-groups9">
              <label className="form-labels9">Message</label>
              <div className="input-wrappers9">
                <MessageSquare className="input-iconss9 textarea-icons9" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="form-textareas9"
                  placeholder="Tell us about your property needs..."
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`submit-buttons9 ${isSubmitting ? 'submitting-s9' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinners9"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="button-iconss9" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footers9">
          We'll get back to you within 24 hours
        </div>
      </div>

      <style jsx>{`
        /* Reset and base styles */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        /* Container styles */
        .contact-containers9 {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .contact-wrappers9 {
          width: 100%;
          max-width: 28rem;
        }

        /* Header styles */
        .contact-headers9 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .contact-titles9 {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          animation: slideInDown 0.6s ease-out;
        }

        .contact-subtitles9 {
          color: #6b7280;
          font-size: 1rem;
          line-height: 1.5;
          animation: slideInUp 0.6s ease-out 0.2s both;
        }

        /* Form card styles */
        .contact-form-cards9 {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          padding: 1.5rem;
          animation: slideInUp 0.6s ease-out 0.4s both;
          transition: all 0.3s ease;
        }

        .contact-form-cards9:hover {
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 8px 12px -4px rgba(0, 0, 0, 0.08);
          transform: translateY(-5px);
        }

        .form-containers9 {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* Form field styles */
        .form-groups9 {
          display: flex;
          flex-direction: column;
          animation: fadeInLeft 0.6s ease-out calc(0.6s + var(--delay, 0s)) both;
        }

        .form-groups9:nth-child(1) { --delay: 0.1s; }
        .form-groups9:nth-child(2) { --delay: 0.2s; }
        .form-groups9:nth-child(3) { --delay: 0.3s; }
        .form-groups9:nth-child(4) { --delay: 0.4s; }

        .form-labels9 {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .input-wrappers9 {
          position: relative;
        }

        .input-iconss9 {
          position: absolute;
          left: 0.75rem;
          top: 0.75rem;
          width: 1.25rem;
          height: 1.25rem;
          color: #9ca3af;
          pointer-events: none;
          transition: all 0.3s ease;
          z-index: 1;
        }

        .textarea-icons9 {
          top: 0.75rem;
        }

        .form-inputss9,
        .form-textareas9 {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          background-color: white;
          position: relative;
        }

        .form-inputss9:focus,
        .form-textareas9:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          transform: translateY(-2px);
        }

        .form-inputss9:focus + .input-iconss9,
        .form-textareas9:focus + .input-iconss9 {
          color: #3b82f6;
          transform: scale(1.1);
        }

        .form-inputss9::placeholder,
        .form-textareas9::placeholder {
          color: #9ca3af;
        }

        .form-textareas9 {
          resize: none;
          min-height: 6rem;
          font-family: inherit;
        }

        /* Submit button styles */
        .submit-buttons9 {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 1rem;
          animation: fadeInUp 0.6s ease-out 1.2s both;
          position: relative;
          overflow: hidden;
        }

        .submit-buttons9::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-buttons9:hover:not(.submitting-s9) {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
        }

        .submit-buttons9:hover:not(.submitting-s9)::before {
          left: 100%;
        }

        .submit-buttons9:active:not(.submitting-s9) {
          transform: translateY(-1px);
        }

        .submitting-s9 {
          opacity: 0.8;
          cursor: not-allowed;
          transform: none !important;
        }

        .button-iconss9 {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.3s ease;
        }

        .submit-buttons9:hover:not(.submitting-s9) .button-iconss9 {
          transform: translateX(2px);
        }

        .loading-spinners9 {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Footer styles */
        .contact-footers9 {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: #6b7280;
          animation: fadeIn 0.6s ease-out 1.4s both;
        }

        /* Animations */
        @keyframes slideInDown {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeInLeft {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Responsive Design */

        /* Small screens (phones) - up to 480px */
        @media (max-width: 480px) {
          .contact-containers9 {
            padding: 0.75rem;
          }
          
          .contact-titles9 {
            font-size: 1.75rem;
          }
          
          .contact-form-cards9 {
            padding: 1.25rem;
          }
          
          .form-containers9 {
            gap: 1.25rem;
          }
          
          .form-inputss9,
          .form-textareas9 {
            font-size: 0.9rem;
            padding: 0.65rem 0.9rem 0.65rem 2.25rem;
          }
          
          .input-iconss9 {
            left: 0.65rem;
            top: 0.65rem;
            width: 1.1rem;
            height: 1.1rem;
          }

          .textarea-icons9 {
            top: 0.65rem;
          }
        }

        /* Medium screens (tablets) - 481px to 768px */
        @media (min-width: 481px) and (max-width: 768px) {
          .contact-wrappers9 {
            max-width: 32rem;
          }
          
          .contact-titles9 {
            font-size: 2.25rem;
          }
          
          .contact-form-cards9 {
            padding: 2rem;
          }
        }

        /* Large screens (small desktops) - 769px to 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .contact-wrappers9 {
            max-width: 36rem;
          }
          
          .contact-titles9 {
            font-size: 2.5rem;
          }
          
          .contact-form-cards9 {
            padding: 2.5rem;
          }
          
          .form-containers9 {
            gap: 2rem;
          }
        }

        /* Extra large screens (large desktops) - 1025px and up */
        @media (min-width: 1025px) {
          .contact-wrappers9 {
            max-width: 40rem;
          }
          
          .contact-titles9 {
            font-size: 3rem;
          }
          
          .contact-subtitles9 {
            font-size: 1.125rem;
          }
          
          .contact-form-cards9 {
            padding: 3rem;
          }
          
          .form-containers9 {
            gap: 2rem;
          }
          
          .form-inputss9,
          .form-textareas9 {
            font-size: 1.1rem;
            padding: 0.875rem 1.125rem 0.875rem 2.75rem;
          }
          
          .input-iconss9 {
            left: 0.875rem;
            top: 0.875rem;
            width: 1.375rem;
            height: 1.375rem;
          }

          .textarea-icons9 {
            top: 0.875rem;
          }
          
          .submit-buttons9 {
            font-size: 1.1rem;
            padding: 0.875rem 1.75rem;
          }
        }

        /* Ultra wide screens - 1440px and up */
        @media (min-width: 1440px) {
          .contact-wrappers9 {
            max-width: 44rem;
          }
          
          .contact-headers9 {
            margin-bottom: 2.5rem;
          }
          
          .contact-footers9 {
            margin-top: 2rem;
          }
        }

        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .contact-form-cards9 {
            box-shadow: 0 12px 28px -7px rgba(0, 0, 0, 0.15), 0 6px 8px -3px rgba(0, 0, 0, 0.08);
          }
        }

        /* Landscape orientation for mobile */
        @media (max-height: 500px) and (orientation: landscape) {
          .contact-containers9 {
            padding: 1rem 2rem;
          }

          .contact-headers9 {
            margin-bottom: 1rem;
          }

          .contact-titles9 {
            font-size: 1.5rem;
          }

          .contact-subtitles9 {
            font-size: 0.9rem;
          }

          .form-containers9 {
            gap: 1rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .contact-containers9 {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
          }
          
          .contact-form-cards9 {
            background: #1e293b;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
          }
          
          .contact-titles9 {
            color: white;
          }
          
          .contact-subtitles9 {
            color: #94a3b8;
          }
          
          .form-labels9 {
            color: #e2e8f0;
          }
          
          .form-inputss9,
          .form-textareas9 {
            background-color: #334155;
            border-color: #475569;
            color: white;
          }
          
          .form-inputss9:focus,
          .form-textareas9:focus {
            border-color: #60a5fa;
            box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
          }
          
          .form-inputss9::placeholder,
          .form-textareas9::placeholder {
            color: #94a3b8;
          }
          
          .contact-footers9 {
            color: #94a3b8;
          }
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }

          .submit-buttons9::before {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactNowPage;
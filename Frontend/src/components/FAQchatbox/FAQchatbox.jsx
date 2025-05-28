import React, { useState, useEffect, useRef } from 'react';
import './FAQchatbox.css';

const faqResponses = {
  "what is your website about": "This website helps users find and manage real estate properties easily. We provide a comprehensive platform for property listings, searches, and direct communication between buyers and sellers.",
  "how can i list a property": "Go to the 'List Property' page and fill out the form with your property details. You'll need to provide information like location, price, property type, amenities, and photos. The process is simple and takes just a few minutes.",
  "is there any brokerage fee": "No, we aim to eliminate brokerage fees by connecting buyers and sellers directly. Our platform is designed to save you money by removing middlemen from the transaction process.",
  "how to contact support": "You can reach out via the Contact page or email us at nishisrivastava303@gmail.com. Our support team typically responds within 24 hours during business days.",
  "can i edit my listed property": "Yes, log in to your account, go to 'My Listings', and click on the edit icon next to your property. You can update details, photos, pricing, and availability status anytime.",
  "how do i delete a property listing": "Navigate to 'My Listings', and click the delete option for the property you want to remove. You'll be asked to confirm the deletion to prevent accidental removals.",
  "do i need an account to view properties": "No, you can browse all listings without logging in, but you'll need an account to save properties, contact owners, or list your own properties.",
  "is my personal data secure": "Yes, we use secure authentication and encryption practices to protect your information. We follow industry-standard security protocols and never share your personal data with third parties.",
  "how can i save a property for later": "Click the 'Save' icon on any listing to add it to your saved properties list. You'll need to be logged in to use this feature.",
  "are listings verified": "We verify property details manually or through owner verification to maintain listing authenticity. Our team reviews each listing to ensure accuracy and legitimacy.",
  "can i list rental properties": "Yes, you can list properties for rent, lease, or sale — just choose the appropriate option on the listing form. We support all types of property transactions.",
  "what file formats are accepted for photos": "You can upload JPG, JPEG, and PNG images under 5MB each. We recommend high-quality photos to make your listing more attractive to potential buyers or renters.",
  "can i communicate with the property owner": "Yes, once logged in, you can use the contact form on the property page to message the owner directly. This ensures secure and private communication.",
  "is this platform free to use": "Yes, listing and browsing properties is completely free for all users. We believe in making property transactions accessible and affordable for everyone."
};

const FAQChatBox1331 = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMessages, setHasMessages] = useState(false);
  const chatBoxRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && isOpen) {
          // Adjust container size for mobile
          container.style.maxHeight = `${window.innerHeight - 140}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleQuestionClick = (question) => {
    const answer = faqResponses[question.toLowerCase()] || "Sorry, I don't have an answer for that yet. Please contact our support team for further assistance.";
    
    const newChat = [
      ...chatHistory,
      { type: 'user', text: question, timestamp: new Date().toLocaleTimeString() },
      { type: 'bot', text: answer, timestamp: new Date().toLocaleTimeString() }
    ];
    
    setChatHistory(newChat);
    setHasMessages(true);
  };

  const handleClearChat = () => {
    setChatHistory([]);
    setHasMessages(false);
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    
    // Add a small delay to ensure smooth animation
    if (!isOpen) {
      setTimeout(() => {
        if (chatBoxRef.current) {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      }, 300);
    }
  };

  // Format questions for display
  const formatQuestion = (question) => {
    return question.charAt(0).toUpperCase() + question.slice(1).replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <>
      {!isOpen && (
        <button 
          className="chat-toggle-btn-1331" 
          onClick={handleToggleChat}
          aria-label="Open FAQ Chat"
          title="Need help? Click to open FAQ chat"
        >
          💬
        </button>
      )}

      {isOpen && (
        <div 
          className="faq-chat-container-1331" 
          ref={containerRef}
          role="dialog"
          aria-label="FAQ Chat Dialog"
        >
          <div className="chat-header-1331">
            <div className="chat-title-1331">
              <span>FAQ Assistant</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {hasMessages && (
                <button 
                  className="close-btn-1331" 
                  onClick={handleClearChat}
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.1)',
                    fontSize: '14px',
                    width: '28px',
                    height: '28px'
                  }}
                  aria-label="Clear chat history"
                  title="Clear chat"
                >
                  🗑️
                </button>
              )}
              <button 
                className="close-btn-1331" 
                onClick={handleToggleChat}
                aria-label="Close FAQ Chat"
                title="Close chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="faq-predefined-questions-1331">
            {Object.keys(faqResponses).map((question, idx) => (
              <button
                key={idx}
                className="faq-suggestion-1331"
                onClick={() => handleQuestionClick(question)}
                title={`Click to ask: ${formatQuestion(question)}`}
                aria-label={`Ask about ${question}`}
              >
                {formatQuestion(question)}
              </button>
            ))}
          </div>

          <div 
            className={`faq-chat-box-1331 ${hasMessages ? 'expanded-1331' : ''}`}
            ref={chatBoxRef}
            role="log"
            aria-live="polite"
            aria-label="Chat conversation"
          >
            {chatHistory.length === 0 && (
              <div style={{
                textAlign: 'center',
                color: 'var(--text-light-1331)',
                fontStyle: 'italic',
                padding: '20px',
                background: 'linear-gradient(135deg, var(--background-light-1331) 0%, white 100%)',
                borderRadius: '12px',
                border: '2px dashed var(--border-color-1331)',
                margin: '10px 0'
              }}>
                👋 Welcome! Click any question above to start our conversation.
              </div>
            )}
            
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`chat-message-1331 ${msg.type === 'user' ? 'user-msg-1331' : 'bot-msg-1331'}`}
                role={msg.type === 'user' ? 'user' : 'assistant'}
                aria-label={`${msg.type === 'user' ? 'Your question' : 'Bot response'}: ${msg.text}`}
              >
                <div style={{ marginBottom: '4px' }}>
                  {msg.text}
                </div>
                {msg.timestamp && (
                  <div style={{
                    fontSize: '10px',
                    opacity: 0.7,
                    textAlign: msg.type === 'user' ? 'right' : 'left',
                    marginTop: '4px'
                  }}>
                    {msg.timestamp}
                  </div>
                )}
              </div>
            ))}
          </div>

          {hasMessages && (
            <div style={{
              padding: '8px 16px',
              background: 'var(--background-light-1331)',
              borderTop: '1px solid var(--border-light-1331)',
              fontSize: '12px',
              color: 'var(--text-secondary-1331)',
              textAlign: 'center'
            }}>
              💡 Click another question above for more help
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FAQChatBox1331;
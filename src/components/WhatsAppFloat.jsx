import React from 'react';

const WhatsAppFloat = () => {
  const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp kamu (format internasional tanpa +)

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <button 
      onClick={handleClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25d366',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000,
      }}
      aria-label="Chat via WhatsApp"
      title="Chat via WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="#fff"
        viewBox="0 0 24 24"
      >
        <path d="M20.52 3.48A11.81 11.81 0 0012 0C5.37 0 0 5.37 0 12a11.89 11.89 0 001.64 6L0 24l6-1.63a11.85 11.85 0 006 1.63c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52zM12 21.54a9.46 9.46 0 01-4.83-1.35l-.35-.21-3.6.97.96-3.52-.22-.36A9.44 9.44 0 012.52 12c0-5.2 4.23-9.44 9.44-9.44 2.52 0 4.88.98 6.65 2.75a9.36 9.36 0 012.75 6.69c0 5.2-4.22 9.44-9.44 9.44zm5.2-6.67c-.29-.15-1.7-.84-1.96-.94-.26-.1-.45-.15-.64.15-.19.29-.73.94-.9 1.13-.16.19-.32.21-.61.07a8.38 8.38 0 01-2.46-1.52 9.32 9.32 0 01-1.73-2.14c-.18-.31 0-.48.13-.63.13-.13.29-.33.44-.49.15-.15.2-.26.3-.44.1-.19.05-.35-.02-.5-.07-.15-.64-1.54-.88-2.11-.23-.56-.46-.49-.64-.5-.16 0-.35 0-.54 0-.19 0-.5.07-.76.35-.26.28-1 1-1 2.44 0 1.44 1.03 2.84 1.18 3.04.15.19 2.04 3.12 4.95 4.37a7.89 7.89 0 003.54.55c.17 0 .54-.07.77-.35.23-.28.91-1.12 1.04-2.2.13-1.07.13-1.99-.94-2.64z"/>
      </svg>
    </button>
  );
};

export default WhatsAppFloat;

import React from "react";

const UIIconTickCircle: React.FC = React.memo(() => {
  return (
    <svg className="icon-tick-circle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" strokeWidth="1" />
      <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

export default UIIconTickCircle;

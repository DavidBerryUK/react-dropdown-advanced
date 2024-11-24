import React from "react";

const UIIconCircle: React.FC = React.memo(() => {
  return (
    <svg className="icon-circle" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" strokeWidth="1" />
    </svg>
  );
});

export default UIIconCircle;

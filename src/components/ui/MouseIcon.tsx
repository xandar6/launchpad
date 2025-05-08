import React from "react";

const MouseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props} // Spread any additional props (like className, style)
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37 20V40C37 49.3888 29.3888 57 20 57C10.6112 57 3 49.3888 3 40V20C3 10.6112 10.6112 3 20 3C29.3888 3 37 10.6112 37 20ZM0 20C0 8.9543 8.95431 0 20 0C31.0457 0 40 8.95431 40 20V40C40 51.0457 31.0457 60 20 60C8.95431 60 0 51.0457 0 40V20ZM22 15C22 13.8954 21.1046 13 20 13C18.8954 13 18 13.8954 18 15V25C18 26.1046 18.8954 27 20 27C21.1046 27 22 26.1046 22 25V15Z"
        fill="currentColor" // Use currentColor to allow styling via CSS color property
      />
    </svg>
  );
};

export default MouseIcon;

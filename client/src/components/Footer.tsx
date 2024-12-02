import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2025 Gergoe Szabo. All rights reserved</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

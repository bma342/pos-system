import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Client Brand. All rights reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/support" className="hover:underline">
              Support
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

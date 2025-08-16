// Footer.jsx
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import logo from "/logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-center">
        {/* Brand */}
        <div>
          <div className="">
            <img src={logo} alt="" className="w-20" />
            <h2 className="text-2xl font-bold text-blue-500 mb-2">ScholarX</h2>
          </div>
          <p className="text-sm">
            Empowering students with access to scholarships and opportunities
            worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a className="link link-hover">Home</a>
            </li>
            <li>
              <a className="link link-hover">Apply</a>
            </li>
            <li>
              <a className="link link-hover">Dashboard</a>
            </li>
            <li>
              <a className="link link-hover">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="footer-title">Support</h3>
          <ul className="space-y-2">
            <li>
              <a className="link link-hover">Contact Us</a>
            </li>
            <li>
              <Link to={"/privacy-policy"} className="link link-hover">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to={"/terms-of-service"} className="link link-hover">
                Terms of Service
              </Link>
            </li>
            <li>
              <a className="link link-hover">Help Center</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="footer-title">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.facebook.com/borhan.siddque.19/"
              target="_blank"
            >
              <FaFacebook className="w-6 h-6 hover:text-primary" />
            </a>
            <a href="#" target="_blank">
              <FaTwitter className="w-6 h-6 hover:text-primary" />
            </a>
            <a
              href="https://www.linkedin.com/in/borhan-siddque/"
              target="_blank"
            >
              <FaLinkedin className="w-6 h-6 hover:text-primary" />
            </a>
            <a
              href="mailto:borhansiddque19@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope className="w-6 h-6 hover:text-primary" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center mt-10 border-t-2 border-blue-200 pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} ScholarX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

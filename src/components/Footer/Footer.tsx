import React from "react";
import { Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import contactBg from "@/assets/images/contact/contact_bg.jpg";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "GitHub", href: "#", icon: Github },
    { name: "Instagram", href: "#", icon: Instagram },
  ];

  return (
    <footer
      className="bg-cover bg-center text-gray-300 py-40 relative border-t border-gray-600"
      style={{ backgroundImage: `url(${contactBg})` }}>
      <div className="absolute inset-0 bg-[var(--launchpad-navy-overlay)] z-0"></div>
      {/* Added py-40 */}
      <div className="container mx-auto px-6 relative z-10">
        {" "}
        {/* Removed py-12, added relative z-10 */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Left Side: Logo + Short Tagline */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center space-x-2 mb-4">
              <img
                src="/src/assets/images/rocket.svg"
                alt="Launchpad Web Solutions Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-semibold text-launchpad-white font-[var(--launchpad-poppins-font)]">
                Launchpad Web Solutions
              </span>
            </a>
            <p className="text-sm font-[var(--launchpad-poppins-font)]">
              Modern websites. Scalable solutions. Built with care.
            </p>
          </div>

          {/* 2. Quick Links (Navigation) */}
          <div>
            <h5 className="mb-4 font-semibold text-launchpad-white uppercase font-[var(--launchpad-poppins-font)]">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-launchpad-blue transition-colors duration-200 font-[var(--launchpad-poppins-font)]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h5 className="mb-4 font-semibold text-launchpad-white uppercase font-[var(--launchpad-poppins-font)]">
              Contact Us
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-launchpad-blue"
                />
                <a
                  href="mailto:hello@launchpadwebsolutions.com"
                  className="hover:text-launchpad-blue transition-colors duration-200 font-[var(--launchpad-poppins-font)]">
                  hello@launchpadwebsolutions.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="mr-2 mt-1 flex-shrink-0 text-launchpad-blue"
                />
                <span className="font-[var(--launchpad-poppins-font)]">
                  Based in Australia — working worldwide
                </span>
              </li>
            </ul>
          </div>

          {/* 4. Social Media Icons */}
          <div>
            <h5 className="mb-4 font-semibold text-launchpad-white uppercase font-[var(--launchpad-poppins-font)]">
              Connect
            </h5>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-launchpad-blue transition-colors duration-200">
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* 5. Bottom Bar (Legal + Credit) */}
        <div className="mt-12 border-t border-launchpad-gray/30 pt-8 text-center text-sm">
          <p className="mb-1 font-[var(--launchpad-poppins-font)]">
            © {new Date().getFullYear()} Launchpad Web Solutions. All rights
            reserved.
          </p>
          <p className="font-[var(--launchpad-poppins-font)]">
            Website handcrafted with React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

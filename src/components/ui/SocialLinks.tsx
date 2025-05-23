import React from "react";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming utils path

interface SocialLinkItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const socialLinksData: SocialLinkItem[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/launchpad-web-solutions/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/launchpadwebsolutions/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61574768162537/",
    icon: Facebook,
  },
];

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
  iconClassName,
}) => {
  return (
    <div className={cn("flex items-center space-x-3", className)}>
      {socialLinksData.map((social) => (
        <a
          key={social.name}
          href={social.href}
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-gray-300 hover:text-launchpad-blue transition-colors duration-200",
            iconClassName
          )}>
          <social.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;

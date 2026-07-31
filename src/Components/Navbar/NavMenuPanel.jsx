import { Link } from "react-router-dom";
import { Heart, Instagram, Gamepad2, MessageCircle, Hash } from "lucide-react";
import { SafeModeToggle } from "./SafeModeToggle";
import { NavIconButton } from "./NavIconButton";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  {
    label: "Patreon Membership",
    to: `/redirector?to=${encodeURIComponent("https://www.patreon.com/MOOSTYLES")}`,
  },
  { label: "Mod List", to: "/mods" },
  { label: "Support", to: "/support" },
];

// Same social destinations already published in Footer.jsx/Links.jsx.
// lucide-react has no real brand marks for these platforms, so each uses
// the same generic stand-in icon already established in Links.jsx.
const SOCIAL_LINKS = [
  { label: "Patreon", icon: Heart, url: "https://www.patreon.com/c/MOOSTYLES" },
  { label: "Instagram", icon: Instagram, url: "https://www.instagram.com/moostyles_inzoi/" },
  { label: "CurseForge", icon: Gamepad2, url: "https://www.curseforge.com/members/moocalf" },
  { label: "Pinterest", icon: MessageCircle, url: "https://pin.it/Zz1UgHeLi" },
  { label: "Discord", icon: Hash, url: "https://discord.gg/Dpr5cs7TQc" },
];

export const NavMenuPanel = ({ onNavigate }) => (
  <div className="nav-menu">
    <Link to="/" className="nav-menu__brand" onClick={onNavigate}>
      <img
        src="/projects/Website Branding/MOOSTYLES LOGO - TEAL COLOR.png"
        alt=""
        className="nav-menu__brand-logo"
      />
      <span className="nav-menu__brand-label">MOOSTYLES</span>
    </Link>

    <nav className="nav-menu__links" aria-label="Primary">
      {NAV_LINKS.map((link) => (
        <Link key={link.label} to={link.to} className="nav-menu__link" onClick={onNavigate}>
          {link.label}
        </Link>
      ))}
    </nav>

    <SafeModeToggle />

    <div className="nav-menu__socials">
      {SOCIAL_LINKS.map((social) => (
        <NavIconButton
          key={social.label}
          icon={social.icon}
          label={social.label}
          to={`/redirector?to=${encodeURIComponent(social.url)}`}
        />
      ))}
    </div>
  </div>
);

import { Link } from "react-router-dom";

// Circular, shadowed icon button shared by the nav bar trigger, the search
// button, and the social icon row in the dropdown menu. `to` renders a
// react-router Link (internal route, e.g. /redirector?to=...); `onClick`
// renders a plain button.
export const NavIconButton = ({ icon, label, onClick, to, size = 20 }) => {
  // This project's eslint config has no react/jsx-uses-vars rule, so a
  // capitalized destructured parameter renders correctly but reads as
  // "unused" to no-unused-vars. Re-binding to a `const` (which the config's
  // varsIgnorePattern exempts) avoids that false positive.
  const Icon = icon;
  const className = "nav-icon-button";

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label} title={label}>
        <Icon size={size} aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} aria-label={label} title={label}>
      <Icon size={size} aria-hidden="true" />
    </button>
  );
};

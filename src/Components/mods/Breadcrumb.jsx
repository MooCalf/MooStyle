import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Single parent link at the top of every mod/collection detail page, per
// the newdesign-layout spec (e.g. a link back to the parent collection).
export const Breadcrumb = ({ to, label }) => (
  <Link to={to} className="mod-breadcrumb">
    <ChevronLeft size={16} aria-hidden="true" />
    {label}
  </Link>
);

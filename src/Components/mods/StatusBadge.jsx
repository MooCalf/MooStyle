const STATE_LABELS = {
  compatible: "Compatible",
  "needs-update": "Needs Update",
  broken: "Broken",
};

// state is one of compatible | needs-update | broken | untested. The
// "untested" tag has been removed entirely per request: since MOOSTYLES has
// not tracked per-mod compatibility QA before this redesign, every mod in
// the catalog is currently "untested", so this renders nothing rather than
// a visible "Untested" badge. Update a mod's status.compatibility to one of
// the three known states above once it's actually been verified.
export const StatusBadge = ({ state, gameVersion }) => {
  const label = STATE_LABELS[state];
  if (!label) return null;

  return (
    <span className={`status-badge status-badge--${state}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      <span className="status-badge__label">{label}</span>
      {gameVersion && <span className="status-badge__version">{gameVersion}</span>}
    </span>
  );
};

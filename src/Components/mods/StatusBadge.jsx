const STATE_LABELS = {
  compatible: "Compatible",
  "needs-update": "Needs Update",
  broken: "Broken",
  untested: "Untested",
};

// state is one of compatible | needs-update | broken | untested. Every mod
// in this catalog is currently "untested" -- MOOSTYLES has not tracked
// per-mod compatibility QA before this redesign, so that is the honest
// default rather than a guessed "compatible".
export const StatusBadge = ({ state = "untested", gameVersion }) => {
  const label = STATE_LABELS[state] || STATE_LABELS.untested;
  const knownState = STATE_LABELS[state] ? state : "untested";

  return (
    <span className={`status-badge status-badge--${knownState}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      <span className="status-badge__label">{label}</span>
      {gameVersion && <span className="status-badge__version">{gameVersion}</span>}
    </span>
  );
};

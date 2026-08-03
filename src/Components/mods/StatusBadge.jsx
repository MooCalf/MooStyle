const STATE_LABELS = {
  compatible: "Compatible",
  "needs-update": "Needs Update",
  broken: "Broken",
};

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

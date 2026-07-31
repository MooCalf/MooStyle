// Pure date logic for the DownloadOptions component, kept separate from the
// component itself so the UTC boundary behavior can be unit tested with a
// mocked clock without touching the DOM.

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "EEE, d MMMM yyyy", always read from the UTC calendar fields so the same
// date string renders identically regardless of the visitor's local
// timezone.
export const formatReleaseDate = (dateInput) => {
  if (!dateInput) return null;
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;
  return `${DAYS[date.getUTCDay()]}, ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

// A missing public release date means the mod has no tracked gating date
// (for example, mods migrated from before download gating existed) and is
// treated as already released, not as perpetually locked.
export const isPublicLocked = (publicDateInput, now = Date.now()) => {
  if (!publicDateInput) return false;
  const publicDate = new Date(publicDateInput).getTime();
  if (Number.isNaN(publicDate)) return false;
  return publicDate > now;
};

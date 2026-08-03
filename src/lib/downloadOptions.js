const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const formatReleaseDate = (dateInput) => {
  if (!dateInput) return null;
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) return null;
  return `${DAYS[date.getUTCDay()]}, ${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
};

export const isPublicLocked = (publicDateInput, now = Date.now()) => {
  if (!publicDateInput) return false;
  const publicDate = new Date(publicDateInput).getTime();
  if (Number.isNaN(publicDate)) return false;
  return publicDate > now;
};

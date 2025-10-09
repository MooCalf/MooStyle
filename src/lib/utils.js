// Utils - Cleared for fresh start
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
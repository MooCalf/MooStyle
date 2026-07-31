// issues is an array of plain-text known issues, or null when none have
// been reported. "No known issues reported" is an honest empty state, not a
// claim that the mod has been verified issue-free.
export const KnownIssues = ({ issues }) => {
  if (!issues || !issues.length) {
    return <p className="known-issues known-issues--empty">No known issues reported.</p>;
  }
  return (
    <ul className="known-issues">
      {issues.map((issue, index) => (
        <li className="known-issues__item" key={index}>
          {issue}
        </li>
      ))}
    </ul>
  );
};

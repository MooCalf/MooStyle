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

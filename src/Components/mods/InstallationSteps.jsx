// steps is an array of plain-text installation notes carried over from the
// pre-redesign howToUse field, or null when a mod has no published
// installation notes yet. No fabricated numbered steps are invented here.
export const InstallationSteps = ({ steps }) => {
  if (!steps || !steps.length) {
    return (
      <p className="installation-steps installation-steps--empty">
        Installation notes have not been published for this mod yet.
      </p>
    );
  }
  return (
    <ol className="installation-steps">
      {steps.map((step, index) => (
        <li className="installation-steps__step" key={index}>
          {step}
        </li>
      ))}
    </ol>
  );
};

// Numbered list of the files a mod's download contains. Every mod content
// file must have a non-empty fileManifest -- enforced at load time in
// src/lib/mods.js so a missing manifest fails the build, not just this
// render (see acceptance criteria: "a mod page with an empty manifest is a
// build failure").
export const FileManifest = ({ files = [] }) => {
  if (!files.length) return null;
  return (
    <div className="file-manifest">
      <h3 className="file-manifest__heading">File Included</h3>
      <ol className="file-manifest__list">
        {files.map((file) => (
          <li className="file-manifest__item" key={file.filename}>
            <span className="file-manifest__filename">{file.filename}</span>
            <span className="file-manifest__description">{file.description}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

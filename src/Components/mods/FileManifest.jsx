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

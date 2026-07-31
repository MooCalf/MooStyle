// Two column label/value list; collapses to stacked label-above-value below
// 640px via CSS (see .metadata-list rules in mod-detail.css).
export const MetadataList = ({ fields = [] }) => {
  if (!fields.length) return null;
  return (
    <dl className="metadata-list">
      {fields.map((field) => (
        <div className="metadata-list__row" key={field.label}>
          <dt className="metadata-list__label">{field.label}</dt>
          <dd className="metadata-list__value">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
};

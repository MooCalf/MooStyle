export const archives = [
  /* {
    id: "archive-001",
    name: "Archive Name",
    images: [
      "/projects/BETATESTINGIMAGES/M_p0217730395.jpg",
      "/projects/BETATESTINGIMAGES/M_p0219136879.png"
    ],
    description: "Archived release of the LunaGlow Glass Skin set.",
    isNew: false,
    patreonlink: "https://www.patreon.com/posts/moca-cafe-brand-151507324"
  } */
];

export const getAllArchives = () => archives.map(a => ({ ...a }));

export const getArchiveById = (id) => archives.find(a => a.id === id) || null;

export const searchArchives = (query) => {
  if (!query) return getAllArchives();
  return archives.filter(a => (
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.description.toLowerCase().includes(query.toLowerCase())
  ));
};

export default getAllArchives;

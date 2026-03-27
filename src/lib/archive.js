export const archives = [
  {
    id: "archive-001",
    name: "Steel Frame - Wooden Shelf",
    images: [
      "/projects/Products/Archive Images/Wood - Steel Frame Shelf_Thumbnail_CF.png",
      "/projects/Products/Archive Images/WSFS - Showcase1.jpg",
      "/projects/Products/Archive Images/WSFS - Showcase2.jpg",
    ],
    description: "A simple steel frame wooden shelf. Holds up to 24 small to medium sized items.",
    isNew: true,
    downloadlink: "",
    patreonlink: ""
  },

  {
    id: "archive-002",
    name: "Wooden Swirled Shelf",
    images: [
      "/projects/Products/Archive Images/Wooden Swirled Shelf_Thumbnail_CF.png",
      "/projects/Products/Archive Images/WSS - Showcase1.jpg",
    ],
    description: "A simple Wooden Swirled Shelf. Holds one item on each shelf.",
    isNew: true,
    downloadlink: "",
    patreonlink: ""
  },

  {
    id: "archive-003",
    name: "Rounded Wooden Shelf",
    images: [
      "/projects/Products/Archive Images/Rounded Wooden Shelf_Thumbnail_CF.png",
      "/projects/Products/Archive Images/RWS_Showcase1.jpg",
    ],
    description: "A simple curved and rounded wooden shelf for decorative pieces. Holds up to 20+ items total.",
    isNew: true,
    downloadlink: "",
    patreonlink: ""
  },
];

archives.forEach((a) => {
  const dl = (a.downloadLink ?? a.downloadlink ?? "").trim() || null;
  const pl = (a.patreonLink ?? a.patreonlink ?? "").trim() || null;

  a.downloadLink = dl;
  a.downloadlink = dl;
  a.patreonLink = pl;
  a.patreonlink = pl;
});

export const getAllArchives = () => archives.map((a) => ({
  ...a,
  downloadLink: (a.downloadLink ?? a.downloadlink ?? "").trim() || null,
  downloadlink: (a.downloadLink ?? a.downloadlink ?? "").trim() || null,
  patreonLink: (a.patreonLink ?? a.patreonlink ?? "").trim() || null,
  patreonlink: (a.patreonLink ?? a.patreonlink ?? "").trim() || null,
}));

export const getArchiveById = (id) => archives.find(a => a.id === id) || null;

export const searchArchives = (query) => {
  if (!query) return getAllArchives();
  return archives.filter(a => (
    a.name.toLowerCase().includes(query.toLowerCase()) ||
    a.description.toLowerCase().includes(query.toLowerCase())
  ));
};

export default getAllArchives;

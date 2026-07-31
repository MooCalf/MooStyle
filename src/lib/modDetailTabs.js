// Default SectionTabs tab set for the mod detail page, per newdesign-layout
// Section 6 decision 6. Kept separate from the SectionTabs component file so
// react-refresh only has to reload the component when the component itself
// changes.
export const DEFAULT_MOD_TABS = [
  { label: "All", sectionIds: ["download", "details", "installation", "changelog"] },
  { label: "Details & Download", sectionIds: ["download", "details"] },
  { label: "Installation", sectionIds: ["installation"] },
  { label: "Changelog", sectionIds: ["changelog"] },
];

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/'/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();
};
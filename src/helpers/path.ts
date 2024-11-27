export const getTitle = (path: string) => {
  const lastSegment = path.split("/").pop();

  if (!lastSegment) return "Home";

  return lastSegment
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

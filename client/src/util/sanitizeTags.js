export const sanitizeTags = (value) => {
  let sanitizedValue = value.trim(); // Remove leading and trailing spaces
  sanitizedValue = sanitizedValue.replace(/^[#\s]+/, ""); // Remove '#' symbols and spaces from the beginning
  return sanitizedValue;
};

//Regex control for tags
export const sanitizeTagsAddNewPost = (value) => {
  let sanitizedValue = value.trim(); // Remove leading and trailing spaces
  sanitizedValue = sanitizedValue.replace(/#/g, " "); // Remove all '#' symbols with 1 space
  sanitizedValue = sanitizedValue.replace(/\s+/g, " "); // Replace any sequence of whitespace characters with a single space
  sanitizedValue = sanitizedValue.trim(); // Remove leading and trailing spaces AGAIN
  const tags = sanitizedValue.split(" "); // Split the string by space
  const uniqueTags = [...new Set(tags)]; // Remove any duplicates
  return uniqueTags.join(" "); // Join the unique tags with a space
};

export const capitalizeString = (str: string | undefined): string | null => {
  if (!str) return null;
  // remove all special chars and then replace all _ by space
  const cleaned = str.replace(/[^a-zA-Z0-9\s_]/g, "").replaceAll("_", " ");
  // split the text by space into array of words
  const strArray = cleaned.split(" ");

  // capitalize each word in the array

  const capWordsArray = strArray.map((word) => {
    const firstLetterCap = word.slice(0, 1).toUpperCase();
    const restOfWord = word.slice(1);
    return `${firstLetterCap}${restOfWord}`;
  });
  // revert back to string
  return capWordsArray.join(" ");
};

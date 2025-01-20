export const _getReadableDateTime = (dateTime: string): string => {
  const today = new Date();
  const pastDate = new Date(dateTime);

  const differenceMillis = today.getTime() - pastDate.getTime();
  const differenceInDays = Math.floor(differenceMillis / (1000 * 60 * 60 * 24));
  if (differenceInDays > 5) {
    return `${pastDate.toLocaleDateString()} at ${pastDate.toLocaleTimeString()}`;
  }
  if (differenceInDays === 1) {
    return `Yesterday at ${pastDate.toLocaleTimeString()}`;
  }
  if (differenceInDays === 0) {
    return `Today at ${pastDate.toLocaleTimeString()}`;
  }
  return `${differenceInDays} days ago at  ${pastDate.toLocaleTimeString()}`;
};

/**
 * Converts an array of names into a readable string format.
 * If the array has only one name, it returns the name itself.
 * If the array has more than one name, it joins all names except the last one with a comma,
 * and appends the last name with the word "and".
 *
 * @param to - An array of names to be converted into a readable string.
 * @returns A string representing the names in a readable format.
 *
 */
export const _makeReadableText = (to: string[]): string => {
  if (!to) return "";
  return to.length < 2
    ? to[0] || ""
    : [to.slice(0, -1).join(", "), to[to.length - 1]].join(" and ");
};

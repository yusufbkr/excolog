function capitalize(text?: string) {
  if (!text) return "";

  const trText = text.toLocaleLowerCase("tr");
  const words = trText.split(" ");

  const capitalizedWords = words.map((word) => {
    if (word.length === 0) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
}

export default capitalize;

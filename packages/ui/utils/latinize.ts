import transliterate from "@sindresorhus/transliterate";

function latinize(text: string) {
  return transliterate(text);
}

export default latinize;

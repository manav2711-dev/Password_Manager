export const jumble = (text: string): string => {
  return text
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
export const reverse = (text: string): string => {
  return text.split("").reverse().join("");
};
export const toUppercase = (text: string): string => {
  return text.toUpperCase();
};
export const addEmoji = (text: string): string => {
  return `${text} 🎉`;
};
export const alterEgo = (): string => {
  return "✨ Something ✨";
};
export const spongebob = (text: string): string => {
  return text
    .split("")
    .map((ch, i) => (i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase()))
    .join("");
};
export const easterEgg = (): string => {
  return "🕵️ You found the secret!";
};
export const chaos = (text: string): string => {
  return jumble(toUppercase(text)) + " 💥";
};

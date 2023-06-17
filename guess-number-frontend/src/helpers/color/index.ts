import { generateHash } from "../string";

export const generateColorCode = (str: string) => {
  const hash = generateHash(str);

  const red = (hash & 0xff0000) >> 16;
  const green = (hash & 0x00ff00) >> 8;
  const blue = hash & 0x0000ff;

  const colorCode = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;

  return colorCode;
};

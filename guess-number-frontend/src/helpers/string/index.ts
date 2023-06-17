import stringHash from "string-hash";

export const generateHash = (str: string) => {
  const hash = stringHash(str);
  return hash;
};

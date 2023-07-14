/* eslint-disable prettier/prettier */
export const getRandomNumberBetweenTwoNumber = (n1: number, n2: number) => {
  if (n2 < n1) {
    const temp = n1;
    n1 = n2;
    n2 = temp;
  }

  const random_number = Math.random() * (n2 - n1) + n1;

  return Number(random_number.toFixed(2));
};

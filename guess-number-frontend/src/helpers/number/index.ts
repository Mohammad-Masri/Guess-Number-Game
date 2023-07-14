import numeral from "numeral";

export const makeNumberFormat = (number: number) => {
  return numeral(number).format("0.00");
};

export const generateNumbersFromMinToMax = (min: number, max: number) => {
  const numbers = [];

  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  return numbers;
};

export const getRandomNumberBetweenTwoNumber = (n1: number, n2: number) => {
  if (n2 < n1) {
    let temp = n1;
    n1 = n2;
    n2 = temp;
  }

  let randomNumber = Math.random() * (n2 - n1) + n1;

  return randomNumber;
};

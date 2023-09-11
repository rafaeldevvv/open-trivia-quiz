import randomNumber from "./randomNumber.js";

export default function randomOrder(array) {
  const randomized = array.slice();

  for (let i = 0; i < array.length; i++) {
    const randomIndex = randomNumber(0, array.length);
    const randomValue = randomized[randomIndex];
    const currentValue = randomized[i];

    /* the value at the current index is replaced with some
    other value at a random position, and vice-versa.
    This is done like this because we don't lose any 
    of the original array's items */
    randomized[i] = randomValue;
    randomized[randomIndex] = currentValue;
  }

  return randomized;
}

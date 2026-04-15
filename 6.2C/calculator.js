function calculateSum(a, b) {
  const firstNumber = Number(a);
  const secondNumber = Number(b);

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new Error("Please provide two valid numbers.");
  }

  return firstNumber + secondNumber;
}

module.exports = {
  calculateSum,
};

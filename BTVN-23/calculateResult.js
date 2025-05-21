import validateExpression from "./validateExpression.js";

const calculateResult = (state) => {
  const invalidMessage = validateExpression(state);
  if (invalidMessage) {
    alert(invalidMessage);
    return;
  }

  if (["+", "-", "*", "/"].includes(state.numberChars[state.numberChars.length - 1])) {
    state.numberChars.pop();
  }

  if (state.numberChars.length === 0) return;

  let calcArray = [...state.numberChars];
  console.log("Calculating with array:", calcArray);

  if (calcArray.length < 3) {
    console.log("Not enough elements for calculation");
    return;
  }

  let i = 1;
  while (i < calcArray.length) {
    if (calcArray[i] === "*" || calcArray[i] === "/") {
      const a = Number(calcArray[i - 1]);
      const b = Number(calcArray[i + 1]);

      if (isNaN(a) || isNaN(b)) {
        console.error("Invalid number around operator:", calcArray[i]);
        return;
      }

      let result = calcArray[i] === "*" ? a * b : b === 0 ? Infinity : a / b;
      calcArray.splice(i - 1, 3, result);
      i = 1;
    } else {
      i++;
    }
  }

  i = 1;
  while (i < calcArray.length) {
    if (calcArray[i] === "+" || calcArray[i] === "-") {
      const a = Number(calcArray[i - 1]);
      const b = Number(calcArray[i + 1]);

      if (isNaN(a) || isNaN(b)) {
        console.error("Invalid number around operator:", calcArray[i]);
        return;
      }

      let result = calcArray[i] === "+" ? a + b : a - b;
      calcArray.splice(i - 1, 3, result);
      i = 1;
    } else {
      i++;
    }
  }

  const result = calcArray[0];
  console.log("Result:", result);

  state.resultExport = result;
  state.numberChars = [result];
  state.charNum = [];
  state.behindOp = false;
  state.expectNumber = true;
};

export default calculateResult;
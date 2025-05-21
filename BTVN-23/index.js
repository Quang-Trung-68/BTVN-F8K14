// const onclickBtn = (value, state) => {
//   state.tokens.push(value);
//   console.log("Tokens:", state.tokens);
//   console.log("charNum:", state.charNum);

//   if (typeof value === "number") {
//     state.charNum.push(value);
//     state.behindOp = false;
//     state.expectNumber = false;
//     state.waitingForSignedNumber = false;
//   }

//   else if (value === ".") {
//     if (!state.charNum.includes(".")) {
//       if (state.charNum.length === 0) {
//         state.charNum.push("0");
//       }
//       state.charNum.push(".");
//     }
//     return;
//   }

//   else if (["+", "-", "*", "/", "="].includes(value)) {
//     if (value === "=") {
//       const lastChar = state.numberChars.length > 0
//         ? state.numberChars[state.numberChars.length - 1]
//         : null;
//       if ((lastChar === "*" || lastChar === "/") && state.charNum.length === 0) {
//         alert("Lỗi: Biểu thức không hợp lệ. Không thể kết thúc với phép nhân hoặc chia.");
//         return;
//       }

//       if (state.charNum.length > 0 && !(state.charNum.length === 1 && state.charNum[0] === "-")) {
//         state.numberChars.push(Number(state.charNum.join("")));
//         state.charNum = [];
//       }

//       calculateResult(state);
//       state.behindOp = false;
//       state.expectNumber = true;
//       state.waitingForSignedNumber = false;
//       return;
//     }

//     const lastOp = state.numberChars.length > 0
//       ? state.numberChars[state.numberChars.length - 1]
//       : null;

//     if ((value === "*" || value === "/") &&
//         (lastOp === "*" || lastOp === "/") &&
//         state.charNum.length === 0) {
//       alert(`Lỗi: Không thể sử dụng ${lastOp}${value} liên tiếp. Vui lòng nhập một số trước.`);
//       return;
//     }

//     if ((value === "+" || value === "-") &&
//         (lastOp === "*" || lastOp === "/") &&
//         state.charNum.length === 0) {
//       if (value === "-") {
//         state.charNum.push("-");
//         state.waitingForSignedNumber = true;
//       }
//       return;
//     }

//     if (state.charNum.length > 0 && !(state.charNum.length === 1 && state.charNum[0] === "-")) {
//       state.numberChars.push(Number(state.charNum.join("")));
//       state.charNum = [];
//       state.waitingForSignedNumber = false;
//     }

//     if (state.charNum.length === 1 && state.charNum[0] === "-") {
//       return;
//     }

//     if (state.numberChars.length === 0 && (value === "*" || value === "/")) {
//       alert("Lỗi: Không thể bắt đầu biểu thức với phép nhân hoặc chia.");
//       return;
//     }

//     if (
//       state.behindOp &&
//       ["+", "-"].includes(value) &&
//       ["+", "-"].includes(state.numberChars[state.numberChars.length - 1])
//     ) {
//       const prevOp = state.numberChars[state.numberChars.length - 1];
//       let resultOp;

//       if (prevOp === "+" && value === "+") resultOp = "+";
//       else if (prevOp === "+" && value === "-") resultOp = "-";
//       else if (prevOp === "-" && value === "+") resultOp = "-";
//       else if (prevOp === "-" && value === "-") resultOp = "+";

//       state.numberChars[state.numberChars.length - 1] = resultOp;
//       console.log(`Combined operators ${prevOp}${value} to ${resultOp}`);
//       return;
//     }

//     if (state.behindOp) {
//       state.numberChars[state.numberChars.length - 1] = value;
//     } else {
//       state.numberChars.push(value);
//     }

//     state.behindOp = true;
//     state.expectNumber = true;
//     state.waitingForSignedNumber = false;

//     console.log("Current operations:", state.numberChars);
//   }

//   else if (value === "C") {
//     clearCalculator(state);
//   }
// };

// const calculateResult = (state) => {
//   const invalidMessage = validateExpression(state);
//   if (invalidMessage) {
//     alert(invalidMessage);
//     return;
//   }

//   if (["+", "-", "*", "/"].includes(state.numberChars[state.numberChars.length - 1])) {
//     state.numberChars.pop();
//   }

//   if (state.numberChars.length === 0) return;

//   let calcArray = [...state.numberChars];
//   console.log("Calculating with array:", calcArray);

//   if (calcArray.length < 3) {
//     console.log("Not enough elements for calculation");
//     return;
//   }

//   let i = 1;
//   while (i < calcArray.length) {
//     if (calcArray[i] === "*" || calcArray[i] === "/") {
//       const a = Number(calcArray[i - 1]);
//       const b = Number(calcArray[i + 1]);

//       if (isNaN(a) || isNaN(b)) {
//         console.error("Invalid number around operator:", calcArray[i]);
//         return;
//       }

//       let result = calcArray[i] === "*" ? a * b : b === 0 ? Infinity : a / b;
//       calcArray.splice(i - 1, 3, result);
//       i = 1;
//     } else {
//       i++;
//     }
//   }

//   i = 1;
//   while (i < calcArray.length) {
//     if (calcArray[i] === "+" || calcArray[i] === "-") {
//       const a = Number(calcArray[i - 1]);
//       const b = Number(calcArray[i + 1]);

//       if (isNaN(a) || isNaN(b)) {
//         console.error("Invalid number around operator:", calcArray[i]);
//         return;
//       }

//       let result = calcArray[i] === "+" ? a + b : a - b;
//       calcArray.splice(i - 1, 3, result);
//       i = 1;
//     } else {
//       i++;
//     }
//   }

//   const result = calcArray[0];
//   console.log("Result:", result);

//   state.numberChars = [result];
//   state.charNum = [];
//   state.behindOp = false;
//   state.expectNumber = true;
// };

// const validateExpression = (state) => {
//   if (state.numberChars.length === 0) return null;

//   for (let i = 0; i < state.numberChars.length; i++) {
//     if (state.numberChars[i] === "*" || state.numberChars[i] === "/") {
//       if (i === state.numberChars.length - 1 && state.charNum.length === 0) {
//         return "Lỗi: Biểu thức không hợp lệ. Kết thúc với phép nhân hoặc chia mà không có số sau.";
//       }

//       if (
//         i < state.numberChars.length - 1 &&
//         (state.numberChars[i + 1] === "*" || state.numberChars[i + 1] === "/")
//       ) {
//         return `Lỗi: Không thể sử dụng ${state.numberChars[i]}${state.numberChars[i + 1]} liên tiếp.`;
//       }
//     }
//   }

//   return null;
// };

// const clearCalculator = (state) => {
//   state.tokens = [];
//   state.charNum = [];
//   state.numberChars = [];
//   state.behindOp = false;
//   state.expectNumber = true;
//   state.waitingForSignedNumber = false;
//   console.log("Calculator cleared");
// };

import onclickBtn from "./onclickBtn.js";
import calculateResult from "./calculateResult.js";
import validateExpression from "./validateExpression.js";
import clearCalculator from "./clearCalculator.js";


export { onclickBtn, clearCalculator, calculateResult, validateExpression };

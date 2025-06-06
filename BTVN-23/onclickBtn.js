import calculateResult from "./calculateResult.js";
import clearCalculator from "./clearCalculator.js";

const onclickBtn = (value, state) => {
  state.tokens.push(value);
  console.log("Tokens:", state.tokens);
  console.log("charNum:", state.charNum);

  if (typeof value === "number") {
    state.charNum.push(value);
    state.behindOp = false;
    state.expectNumber = false;
    state.waitingForSignedNumber = false;
  }
  
  else if (value === ".") {
    if (!state.charNum.includes(".")) {
      if (state.charNum.length === 0) {
        state.charNum.push("0");
      }
      state.charNum.push(".");
    }
    return;
  } else if (["+", "-", "*", "/", "="].includes(value)) {
    if (value === "=") {
      const lastChar =
        state.numberChars.length > 0
          ? state.numberChars[state.numberChars.length - 1]
          : null;
      if (
        (lastChar === "*" || lastChar === "/") &&
        state.charNum.length === 0
      ) {
        alert(
          "Lỗi: Biểu thức không hợp lệ. Không thể kết thúc với phép nhân hoặc chia."
        );
        return;
      }

      if (
        state.charNum.length > 0 &&
        !(state.charNum.length === 1 && state.charNum[0] === "-")
      ) {
        state.numberChars.push(Number(state.charNum.join("")));
        state.charNum = [];
      }

      calculateResult(state);
      state.behindOp = false;
      state.expectNumber = true;
      state.waitingForSignedNumber = false;
      return;
    }

    const lastOp =
      state.numberChars.length > 0
        ? state.numberChars[state.numberChars.length - 1]
        : null;

    if (
      (value === "*" || value === "/") &&
      (lastOp === "*" || lastOp === "/") &&
      state.charNum.length === 0
    ) {
      alert(
        `Lỗi: Không thể sử dụng ${lastOp}${value} liên tiếp. Vui lòng nhập một số trước.`
      );
      return;
    }

    if (
      (value === "+" || value === "-") &&
      (lastOp === "*" || lastOp === "/") &&
      state.charNum.length === 0
    ) {
      if (value === "-") {
        state.charNum.push("-");
        state.waitingForSignedNumber = true;
      }
      return;
    }

    if (
      state.charNum.length > 0 &&
      !(state.charNum.length === 1 && state.charNum[0] === "-")
    ) {
      state.numberChars.push(Number(state.charNum.join("")));
      state.charNum = [];
      state.waitingForSignedNumber = false;
    }

    if (state.charNum.length === 1 && state.charNum[0] === "-") {
      return;
    }

   if (state.numberChars.length === 0 && (value === "+" || value === "-")) {
  state.charNum.push(value);
  state.waitingForSignedNumber = true;
  return;
}


    if (
      state.behindOp &&
      ["+", "-"].includes(value) &&
      ["+", "-"].includes(state.numberChars[state.numberChars.length - 1])
    ) {
      const prevOp = state.numberChars[state.numberChars.length - 1];
      let resultOp;

      if (prevOp === "+" && value === "+") resultOp = "+";
      else if (prevOp === "+" && value === "-") resultOp = "-";
      else if (prevOp === "-" && value === "+") resultOp = "-";
      else if (prevOp === "-" && value === "-") resultOp = "+";

      state.numberChars[state.numberChars.length - 1] = resultOp;
      console.log(`Combined operators ${prevOp}${value} to ${resultOp}`);
      return;
    }

    if (state.behindOp) {
      state.numberChars[state.numberChars.length - 1] = value;
    } else {
      state.numberChars.push(value);
    }

    state.behindOp = true;
    state.expectNumber = true;
    state.waitingForSignedNumber = false;

    console.log("Current operations:", state.numberChars);
  } else if (value === "C") {
    clearCalculator(state);
  }
};

export default onclickBtn;

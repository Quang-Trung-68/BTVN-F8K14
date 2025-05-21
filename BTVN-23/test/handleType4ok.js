let tokens = [];
let charNum = [];
let numberChars = [];
let behindOp = false;
let expectNumber = true;

const onclickBtn = (value) => {
  tokens.push(value);
  console.log("Tokens:", tokens);
  console.log("charNum:", charNum);

  // Handle numbers
  if (typeof value === "number") {
    charNum.push(value);
    behindOp = false;
    expectNumber = false;
  }

    // Handle decimal point
  else if (value === ".") {
    if (!charNum.includes(".")) {
      if (charNum.length === 0) {
        // Nếu bắt đầu bằng ".", thêm "0" trước
        charNum.push("0");
      }
      charNum.push(".");
    }
    return;
  }


  // Handle operations and equals
  else if (["+", "-", "*", "/", "="].includes(value)) {
    // Handle +/- after * or /
    if (
      (value === "+" || value === "-") &&
      numberChars.length > 0 &&
      (numberChars[numberChars.length - 1] === "*" ||
        numberChars[numberChars.length - 1] === "/")
    ) {
      if (value === "-") {
        charNum.push("-");
      }
      
      expectNumber = true;
      console.log("Sign after operator:", value);
      return;
    }

    // Convert charNum to number if it's not just a "-"
    if (charNum.length > 0 && !(charNum.length === 1 && charNum[0] === "-")) {
      numberChars.push(Number(charNum.join("")));
      charNum = [];
    }

    // Nếu chỉ có dấu "-" đang chờ số sau, giữ nguyên
    if (charNum.length === 1 && charNum[0] === "-") {
      return;
    }


    if (value !== "=") {
      numberChars.push(value);
      behindOp = true;
      expectNumber = true;
    }
    

    if (value === "=") {
      calculateResult();
    }

    console.log("Current operations:", numberChars);
  }
};

const calculateResult = () => {
  let calcArray = [...numberChars];

  // Xử lý các trường hợp dấu liên tiếp như --, +-, -+, ++
  let i = 0;
  while (i < calcArray.length - 1) {
    const cur = calcArray[i];
    const next = calcArray[i + 1];

    if (cur === "-" && next === "-") {
      calcArray.splice(i, 2, "+");
      i = 0;
      continue;
    }

    if (cur === "-" && next === "+") {
      calcArray.splice(i, 2, "-");
      i = 0;
      continue;
    }

    if (cur === "+" && next === "-") {
      calcArray.splice(i, 2, "-");
      i = 0;
      continue;
    }

    if (cur === "+" && next === "+") {
      calcArray.splice(i, 2, "+");
      i = 0;
      continue;
    }

    i++;
  }

  console.log("Calculating with array:", calcArray);

  // Multiplication & Division
  for (let i = 0; i < calcArray.length; i++) {
    if (calcArray[i] === "*" || calcArray[i] === "/") {
      const a = Number(calcArray[i - 1]);
      const b = Number(calcArray[i + 1]);

      if (isNaN(a) || isNaN(b)) {
        console.error("Invalid number around operator:", calcArray[i]);
        return;
      }

      let result = calcArray[i] === "*" ? a * b : (b === 0 ? Infinity : a / b);
      calcArray.splice(i - 1, 3, result);
      i -= 1;
    }
  }

  // Addition & Subtraction
  for (let i = 0; i < calcArray.length; i++) {
    if (calcArray[i] === "+" || calcArray[i] === "-") {
      const a = Number(calcArray[i - 1]);
      const b = Number(calcArray[i + 1]);

      if (isNaN(a) || isNaN(b)) {
        console.error("Invalid number around operator:", calcArray[i]);
        return;
      }

      let result = calcArray[i] === "+" ? a + b : a - b;
      calcArray.splice(i - 1, 3, result);
      i -= 1;
    }
  }

  console.log("Result:", calcArray[0]);

  numberChars = [calcArray[0]];
  charNum = []; // Reset input number buffer
};

export { onclickBtn };

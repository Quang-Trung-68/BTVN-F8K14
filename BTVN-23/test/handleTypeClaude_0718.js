let tokens = [];
let charNum = [];
let numberChars = [];
let behindOp = false;
let expectNumber = true;
let waitingForSignedNumber = false; // Thêm biến này để theo dõi trạng thái chờ số sau dấu +/- khi đi sau * hoặc /

const onclickBtn = (value) => {
  tokens.push(value);
  console.log("Tokens:", tokens);
  console.log("charNum:", charNum);

  // Handle numbers
  if (typeof value === "number") {
    charNum.push(value);
    behindOp = false;
    expectNumber = false;
    waitingForSignedNumber = false; // Reset flag khi đã nhập số
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
    const lastOp =
      numberChars.length > 0 ? numberChars[numberChars.length - 1] : null;

    if (
      (value === "+" || value === "-") &&
      (lastOp === "*" || lastOp === "/")
    ) {
      if (value === "-") {
        // Chỉ thêm dấu trừ vào charNum khi charNum rỗng
        if (charNum.length === 0) {
          charNum.push("-");
          waitingForSignedNumber = true; // Đánh dấu là đang chờ số sau dấu
        } else {
          // Nếu đã có số trong charNum, xử lý như toán tử bình thường
          numberChars.push(Number(charNum.join("")));
          charNum = [];
          numberChars.push(value);
        }
      } else if (value === "+" && charNum.length === 0) {
        // Dấu + sau * hoặc / không làm gì cả khi chưa có số
        waitingForSignedNumber = true;
      } else {
        // Nếu đã có số trong charNum, xử lý như toán tử bình thường
        numberChars.push(Number(charNum.join("")));
        charNum = [];
        numberChars.push(value);
      }

      expectNumber = true;
      console.log("Sign after operator:", value);
      return;
    }

    // Nếu charNum có giá trị (không phải chỉ là "-" đơn lẻ), chuyển nó thành số
    if (charNum.length > 0 && !(charNum.length === 1 && charNum[0] === "-")) {
      numberChars.push(Number(charNum.join("")));
      charNum = [];
      waitingForSignedNumber = false;
    }

    // Nếu chỉ có dấu "-" đang chờ số sau, giữ nguyên
    if (charNum.length === 1 && charNum[0] === "-") {
      return;
    }

    if (value !== "=") {
      // Kiểm tra nếu phép toán trước đó cũng là phép toán thì thay thế
      if (behindOp) {
        numberChars[numberChars.length - 1] = value;
      } else {
        numberChars.push(value);
      }

      behindOp = true;
      expectNumber = true;
      waitingForSignedNumber = false;
    }

    if (value === "=") {
      calculateResult();
      behindOp = false;
      expectNumber = true;
      waitingForSignedNumber = false;
    }

    console.log("Current operations:", numberChars);
  }
  // Clear button
  else if (value === "C") {
    tokens = [];
    charNum = [];
    numberChars = [];
    behindOp = false;
    expectNumber = true;
    waitingForSignedNumber = false;
    console.log("Calculator cleared");
  }
};

const calculateResult = () => {
  // Nếu kết thúc với một toán tử, bỏ đi
  if (["+", "-", "*", "/"].includes(numberChars[numberChars.length - 1])) {
    numberChars.pop();
  }

  // Nếu không có gì để tính toán
  if (numberChars.length === 0) {
    return;
  }

  let calcArray = [...numberChars];

  // Xử lý các trường hợp dấu liên tiếp như --, +-, -+, ++
  let i = 0;
  while (i < calcArray.length - 1) {
    const cur = calcArray[i];
    const next = calcArray[i + 1];

    // Chỉ xử lý khi cả hai phần tử liên tiếp là toán tử
    if (
      typeof cur === "string" &&
      typeof next === "string" &&
      ["+", "-"].includes(cur) &&
      ["+", "-"].includes(next)
    ) {
      if (cur === "-" && next === "-") {
        calcArray.splice(i, 2, "+");
        console.log("merge -- = +");
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
    }

    i++;
  }

  console.log("Calculating with array:", calcArray);

  // Thêm kiểm tra để đảm bảo phép tính hợp lệ
  if (calcArray.length < 3) {
    console.log("Không đủ phần tử để tính toán");
    return;
  }

  // Multiplication & Division first
  i = 1; // Start from index 1 since we need to look at operators
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
      i = 1; // Reset to the beginning after modifying the array
    } else {
      i++;
    }
  }

  // Addition & Subtraction
  i = 1; // Start from index 1 again
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
      i = 1; // Reset to the beginning after modifying the array
    } else {
      i++;
    }
  }

  const result = calcArray[0];
  console.log("Result:", result);

  // Reset calculator state but keep the result
  numberChars = [result];
  charNum = [];
  behindOp = false;
  expectNumber = true;
};

// Clear calculator completely
const clearCalculator = () => {
  tokens = [];
  charNum = [];
  numberChars = [];
  behindOp = false;
  expectNumber = true;
  waitingForSignedNumber = false;
};

export { onclickBtn, clearCalculator };

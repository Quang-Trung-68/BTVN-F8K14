let tokens = [];
let charNum = [];
let numberChars = [];
let behindOp = false;
let expectNumber = true;

/**
 * Xử lý nhấn nút
 */
const onclickBtn = (value) => {
  tokens.push(value);
  console.log("Tokens:", tokens);
  console.log("charNum:", charNum);

  // Nếu là số
  if (typeof value === "number") {
    charNum.push(value);
    behindOp = false;
    expectNumber = false;
  }
  // Nếu là phép toán hoặc "="
  else if (["+", "-", "*", "/", "="].includes(value)) {
    // Cho phép dấu +/− thành unary chỉ sau * hoặc /
    if (
      (value === "+" || value === "-") &&
      numberChars.length > 0 &&
      (numberChars[numberChars.length - 1] === "*" ||
       numberChars[numberChars.length - 1] === "/")
    ) {
      if (value === "-") charNum.push("-");
      expectNumber = true;
      console.log("Sign after operator:", value);
      return;
    }

    // Chuyển charNum thành số nếu hợp lệ
    if (charNum.length > 0 && !(charNum.length === 1 && charNum[0] === "-")) {
      numberChars.push(Number(charNum.join("")));
      charNum = [];
    }

    // Nếu chỉ mới nhập dấu '-' chờ số thì dừng
    if (charNum.length === 1 && charNum[0] === "-") return;

    // Thêm vào mảng phép tính (ngoại trừ "=")
    if (value !== "=") {
      numberChars.push(value);
      behindOp = true;
      expectNumber = true;
    }

    // Tính khi gặp "="
    if (value === "=") {
      calculateResult();
    }

    console.log("Current operations:", numberChars);
  }
};


/**
 * Chuẩn hoá toán tử:
 *  1. --, -+, +-, ++ trước số thành + hoặc -
 *  2. Gom dấu +/− với số thành số âm/dương, nhưng chỉ nếu nó là dấu unary (ở đầu hoặc sau * hoặc /)
 */
const normalizeOperators = (arr) => {
  let calcArray = [...arr];

  // 1) Chuẩn hoá chuỗi dấu liên tiếp trước số: --4 → +4, +-4 → -4, etc.
  let i = 0;
  while (i < calcArray.length - 2) {
    const a = calcArray[i], b = calcArray[i + 1], c = calcArray[i + 2];
    if (["+", "-"].includes(a) && ["+", "-"].includes(b) && !isNaN(c)) {
      const combined = (a === b) ? "+" : "-";
      calcArray.splice(i, 2, combined);
      i = 0;
      continue;
    }
    i++;
  }

  // 2) Gom dấu unary +/− với số kế tiếp 
  i = 0;
  while (i < calcArray.length - 1) {
    const current = calcArray[i], next = calcArray[i + 1];
    const prev = calcArray[i - 1];

    // Chỉ gom khi current là +/−, next là số, và unary (ở đầu hoặc sau * hoặc /)
    if (
      (current === "+" || current === "-") &&
      !isNaN(next) &&
      (i === 0 || prev === "*" || prev === "/")
    ) {
      const num = Number(current + next);
      calcArray.splice(i, 2, num);
      i = 0;
      continue;
    }
    i++;
  }

  return calcArray;
};


/**
 * Thực hiện tính toán theo thứ tự ưu tiên
 */
const calculateResult = () => {
  let calcArray = normalizeOperators(numberChars);

  console.log("Calculating with normalized array:", calcArray);

  // Nhân / Chia trước
  for (let i = 0; i < calcArray.length; i++) {
    if (calcArray[i] === "*" || calcArray[i] === "/") {
      const a = Number(calcArray[i - 1]), b = Number(calcArray[i + 1]);
      if (isNaN(a) || isNaN(b)) {
        console.error("Invalid around:", calcArray[i]);
        return;
      }
      const res = (calcArray[i] === "*") ? a * b : (b === 0 ? Infinity : a / b);
      calcArray.splice(i - 1, 3, res);
      i--;
    }
  }

  // Cộng / Trừ sau
  for (let i = 0; i < calcArray.length; i++) {
    if (calcArray[i] === "+" || calcArray[i] === "-") {
      const a = Number(calcArray[i - 1]), b = Number(calcArray[i + 1]);
      if (isNaN(a) || isNaN(b)) {
        console.error("Invalid around:", calcArray[i]);
        return;
      }
      const res = (calcArray[i] === "+") ? a + b : a - b;
      calcArray.splice(i - 1, 3, res);
      i--;
    }
  }

  console.log("Result:", calcArray[0]);

  // Cập nhật để tiếp tục tính
  numberChars = [calcArray[0]];
  charNum = [];
};

export { onclickBtn };

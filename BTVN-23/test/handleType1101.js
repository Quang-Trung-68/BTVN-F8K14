let tokens = [];
let charNum = [];
let numberChars = [];
let behindOp = false;
let expectNumber = true;
let waitingForSignedNumber = false;

const onclickBtn = (value) => {
  tokens.push(value);
  console.log("Tokens:", tokens);
  console.log("charNum:", charNum);

  // Handle numbers
  if (typeof value === "number") {
    charNum.push(value);
    behindOp = false;
    expectNumber = false;
    waitingForSignedNumber = false; // Reset flag when number is entered
  }

  // Handle decimal point
  else if (value === ".") {
    if (!charNum.includes(".")) {
      if (charNum.length === 0) {
        // If starting with ".", add "0" before
        charNum.push("0");
      }
      charNum.push(".");
    }
    return;
  }

  // Handle operations and equals
  else if (["+", "-", "*", "/", "="].includes(value)) {
    // If equals, calculate immediately
    if (value === "=") {
      // Check for invalid endings like "5*" or "3/"
      const lastChar = numberChars.length > 0 ? numberChars[numberChars.length - 1] : null;
      if ((lastChar === "*" || lastChar === "/") && charNum.length === 0) {
        alert("Lỗi: Biểu thức không hợp lệ. Không thể kết thúc với phép nhân hoặc chia.");
        return;
      }
      
      // Only add the current number if there is one
      if (charNum.length > 0 && !(charNum.length === 1 && charNum[0] === "-")) {
        numberChars.push(Number(charNum.join("")));
        charNum = [];
      }
      calculateResult();
      behindOp = false;
      expectNumber = true;
      waitingForSignedNumber = false;
      return;
    }

    // Handle invalid operations: Check for consecutive * or / operators
    const lastOp = numberChars.length > 0 ? numberChars[numberChars.length - 1] : null;
    
    if ((value === "*" || value === "/") && (lastOp === "*" || lastOp === "/") && charNum.length === 0) {
      alert(`Lỗi: Không thể sử dụng ${lastOp}${value} liên tiếp. Vui lòng nhập một số trước.`);
      return;
    }

    // Special case: handling sign after multiplication or division
    if ((value === "+" || value === "-") && 
        (lastOp === "*" || lastOp === "/") && 
        charNum.length === 0) {
      if (value === "-") {
        charNum.push("-");
        waitingForSignedNumber = true;
      }
      // Just ignore + after * or /
      return;
    }

    // If we have a number in progress, add it to numberChars
    if (charNum.length > 0 && !(charNum.length === 1 && charNum[0] === "-")) {
      numberChars.push(Number(charNum.join("")));
      charNum = [];
      waitingForSignedNumber = false;
    }

    // Skip if we just have a - sign waiting for a number
    if (charNum.length === 1 && charNum[0] === "-") {
      return;
    }

    // Check for empty expression (can't start with * or /)
    if (numberChars.length === 0 && (value === "*" || value === "/")) {
      alert("Lỗi: Không thể bắt đầu biểu thức với phép nhân hoặc chia.");
      return;
    }

    // Handle consecutive operators (++, --, +-, -+)
    if (behindOp && ["+", "-"].includes(value) && 
        ["+", "-"].includes(numberChars[numberChars.length - 1])) {
      
      const prevOp = numberChars[numberChars.length - 1];
      
      // Determine the resulting operator based on the combination
      let resultOp;
      if (prevOp === "+" && value === "+") resultOp = "+";
      else if (prevOp === "+" && value === "-") resultOp = "-";
      else if (prevOp === "-" && value === "+") resultOp = "-";
      else if (prevOp === "-" && value === "-") resultOp = "+";
      
      // Replace the previous operator with the result
      numberChars[numberChars.length - 1] = resultOp;
      console.log(`Combined operators ${prevOp}${value} to ${resultOp}`);
      return;
    }
    
    // Add or replace operator
    if (behindOp) {
      numberChars[numberChars.length - 1] = value;
    } else {
      numberChars.push(value);
    }

    behindOp = true;
    expectNumber = true;
    waitingForSignedNumber = false;
    
    console.log("Current operations:", numberChars);
  }
  // Clear button
  else if (value === "C") {
    clearCalculator();
  }
};

const calculateResult = () => {
  // Validate operation before calculating
  const invalidOperatorCheck = validateExpression();
  if (invalidOperatorCheck) {
    alert(invalidOperatorCheck);
    return;
  }

  // If ending with an operator, remove it
  if (["+", "-", "*", "/"].includes(numberChars[numberChars.length - 1])) {
    numberChars.pop();
  }

  // If nothing to calculate
  if (numberChars.length === 0) {
    return;
  }

  let calcArray = [...numberChars];
  console.log("Calculating with array:", calcArray);

  // Check if calculation is valid
  if (calcArray.length < 3) {
    console.log("Not enough elements for calculation");
    return;
  }

  // Multiplication & Division first
  let i = 1; // Start from index 1 since we need to look at operators
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

// Validate expression for any invalid operator combinations
const validateExpression = () => {
  if (numberChars.length === 0) return null;
  
  // Check for multiplications or divisions without operands
  for (let i = 0; i < numberChars.length; i++) {
    if ((numberChars[i] === "*" || numberChars[i] === "/")) {
      // Check if it's the last operator with no number after
      if (i === numberChars.length - 1 && charNum.length === 0) {
        return "Lỗi: Biểu thức không hợp lệ. Kết thúc với phép nhân hoặc chia mà không có số sau.";
      }
      
      // Check if there's another operator right after
      if (i < numberChars.length - 1 && 
          (numberChars[i+1] === "*" || numberChars[i+1] === "/")) {
        return `Lỗi: Không thể sử dụng ${numberChars[i]}${numberChars[i+1]} liên tiếp.`;
      }
    }
  }
  
  return null;
};

// Clear calculator completely
const clearCalculator = () => {
  tokens = [];
  charNum = [];
  numberChars = [];
  behindOp = false;
  expectNumber = true;
  waitingForSignedNumber = false;
  console.log("Calculator cleared");
};

export { onclickBtn, clearCalculator };
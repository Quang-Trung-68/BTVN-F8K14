let tokens = [];
let charNum = [];
let numberChars = [];
let lastOperator = null;
let expectNumber = true; // Flag to track if we're expecting a number next
let error = null; // Track error state

const onclickBtn = (value) => {
  // Clear any previous error
  error = null;
  
  tokens.push(value);
  console.log("Tokens:", tokens);

  // Handle numbers
  if (typeof value === "number") {
    charNum.push(value);
    expectNumber = false;
    lastOperator = null;
  }
  // Handle operations and equals
  else if (["+", "-", "*", "/", "="].includes(value)) {
    
    // Check for invalid operation sequences
    if (isInvalidOperationSequence(value)) {
      error = "Phép toán không hợp lệ";
      console.error(error);
      return; // Exit the function early
    }
    
    // Handle equals operation
    if (value === "=") {
      // If we have digit(s) in charNum, add to numberChars
      if (charNum.length > 0) {
        numberChars.push(Number(charNum.join("")));
        charNum = [];
      }
      
      // Check if we have a valid expression to calculate
      if (numberChars.length === 0 || 
          typeof numberChars[numberChars.length - 1] !== 'number') {
        error = "Biểu thức không hợp lệ";
        console.error(error);
        return;
      }
      
      // Calculate result
      calculateResult();
      lastOperator = null;
      expectNumber = true;
      return;
    }
    
    // Handle multiple + or - in sequence
    if ((value === "+" || value === "-") && 
        (lastOperator === "+" || lastOperator === "-")) {
      
      // Rules for handling multiple + and - in sequence:
      // ++ becomes +
      // -- becomes +
      // +- becomes -
      // -+ becomes -
      
      if (lastOperator === "+") {
        if (value === "+") {
          // ++ case: Do nothing (keeps +)
        } else {
          // +- case: Replace with -
          numberChars[numberChars.length - 1] = "-";
        }
      } else { // lastOperator === "-"
        if (value === "+") {
          // -+ case: Do nothing (keeps -)
        } else {
          // -- case: Replace with +
          numberChars[numberChars.length - 1] = "+";
        }
      }
      
      lastOperator = numberChars[numberChars.length - 1];
      console.log("Multiple +/- detected, simplified to:", lastOperator);
      return;
    }
    
    // Special case: handle +/- after * or /
    if ((value === "+" || value === "-") && 
        numberChars.length > 0 && 
        (numberChars[numberChars.length - 1] === "*" || 
         numberChars[numberChars.length - 1] === "/")) {
      
      // This is a sign for the next number, not an operation
      if (value === "-") {
        // For negative sign after * or /
        charNum.push("-"); // Add negative sign to charNum array
      }
      // For + sign after * or /, we just ignore it as it doesn't change the number
      expectNumber = true; // Now expecting a number
      console.log("Sign after operator:", value);
      return; // Exit the function early
    }
    
    // Normal processing for operations
    if (charNum.length > 0) {
      // If charNum contains a negative sign only, handle it properly
      if (charNum.length === 1 && charNum[0] === "-") {
        // Just waiting for the number part
      } else {
        // Convert charNum to number and add to numberChars
        numberChars.push(Number(charNum.join("")));
        charNum = [];
      }
    }

    // Add operation to numberChars only if it's not already ending with an operation
    // or if numberChars is empty, add a 0 first (for cases like starting with +/-)
    if (numberChars.length === 0) {
      numberChars.push(0); // Start with 0 if operation is the first input
    } else if (typeof numberChars[numberChars.length - 1] !== 'number') {
      // Replace the previous operation
      numberChars[numberChars.length - 1] = value;
      console.log("Operation replaced with:", value);
      lastOperator = value;
      return;
    }
    
    numberChars.push(value);
    lastOperator = value;
    expectNumber = true;

    console.log("Current operations:", numberChars);
  }
  // Add other buttons like clear, etc. here
};

// Function to check for invalid operation sequences
const isInvalidOperationSequence = (value) => {
  // Invalid sequences when we already have an operation and get another one
  if (lastOperator !== null) {
    const invalidSequences = [
      // Double operations not + or -
      ["*", "*"], ["*", "/"], ["/", "*"], ["/", "/"],
      // Mixed invalid operations
      ["+", "/"], ["-", "/"], ["*", "+"], ["*", "-"]
    ];
    
    // Check if current sequence is invalid
    for (let seq of invalidSequences) {
      if (lastOperator === seq[0] && value === seq[1]) {
        return true;
      }
    }
  }
  
  return false;
};

const calculateResult = () => {
  // Create a copy of the array to work with
  let calcArray = [...numberChars];
  
  console.log("Calculating with array:", calcArray);
  
  // First pass: handle multiplication and division
  for (let i = 0; i < calcArray.length; i++) {
    if (calcArray[i] === "*" || calcArray[i] === "/") {
      let result;
      if (calcArray[i] === "*") {
        result = calcArray[i - 1] * calcArray[i + 1];
      } else {
        // Avoid division by zero
        if (calcArray[i + 1] === 0) {
          error = "Không thể chia cho 0";
          console.error(error);
          numberChars = []; // Reset
          return;
        } else {
          result = calcArray[i - 1] / calcArray[i + 1];
        }
      }
      calcArray.splice(i - 1, 3, result);
      i -= 1; // Adjust index after splicing
    }
  }
  
  // Second pass: handle addition and subtraction
  for (let i = 0; i < calcArray.length; i++) {
    if (calcArray[i] === "+" || calcArray[i] === "-") {
      let result;
      if (calcArray[i] === "+") {
        result = calcArray[i - 1] + calcArray[i + 1];
      } else {
        result = calcArray[i - 1] - calcArray[i + 1];
      }
      calcArray.splice(i - 1, 3, result);
      i -= 1; // Adjust index after splicing
    }
  }
  
  // The final result will be the only element left in the array
  console.log("Result:", calcArray[0]);
  
  // Update numberChars with just the result for continued calculations
  numberChars = [calcArray[0]];
};

// Function to get the current result or error
const getResult = () => {
  if (error) {
    return error;
  }
  
  if (numberChars.length > 0 && typeof numberChars[numberChars.length - 1] === 'number') {
    return numberChars[numberChars.length - 1];
  } else if (charNum.length > 0) {
    return Number(charNum.join(""));
  } else {
    return 0;
  }
};

// Clear function
const clearCalculator = () => {
  tokens = [];
  charNum = [];
  numberChars = [];
  lastOperator = null;
  expectNumber = true;
  error = null;
  console.log("Calculator cleared");
};

// export { onclickBtn, getResult, clearCalculator };
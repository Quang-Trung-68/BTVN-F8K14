let tokens = [];
let charNum = [];
let numberChars = [];
let behindOp = false;
let expectNumber = true; // Flag to track if we're expecting a number next

const onclickBtn = (value) => {
  tokens.push(value);
  console.log("Tokens:", tokens);

  // Handle numbers
  if (typeof value === "number") {
    charNum.push(value);
    behindOp = false;
    expectNumber = false;
    console.log("Number type");
  }
  // Handle operations and equals
  else if (["+", "-", "*", "/", "="].includes(value)) {
    // Special case: handle +/- after * or /
    if (
      (value === "+" || value === "-") &&
      numberChars.length > 0 &&
      (numberChars[numberChars.length - 1] === "*" ||
        numberChars[numberChars.length - 1] === "/")
    ) {
      console.log("***1");
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
      console.log("***2");
      // If charNum contains a negative sign only, handle it properly
      if (charNum.length === 1 && charNum[0] === "-") {
        // Just waiting for the number part
      } else {
        // Convert charNum to number and add to numberChars
        numberChars.push(Number(charNum.join("")));
        charNum = [];
      }
    }

    // Don't add equals sign to the operations array
    if (value !== "=") {
      console.log("***3");
      numberChars.push(value);
      behindOp = true;
      expectNumber = true;
    }

    // Handle equals: perform calculation
    if (value === "=") {
      console.log("***4");
      // Calculate result
      calculateResult();
    }

    console.log("Current operations:", numberChars);
  }
  // Add other buttons like clear, etc. here
};

const calculateResult = () => {
  // Create a copy of the array to work with
  let calcArray = [...numberChars];

    // Add 0 between --, -+
  for (let i = 0; i < calcArray.length - 1; i++) {
    if (
      (calcArray[i] === "-") &&
      (calcArray[i + 1] === "+")
    ) {
      calcArray.splice(i,2,"-");
      i=0;
      continue;
    }

    if (
      (calcArray[i] === "-") &&
      ( calcArray[i + 1] === "-")
    ) {
      calcArray.splice(i, 2, "+");
      i=0;
       continue;
    }

  }
  // Add 0 between ++ or +- , 
  for (let i = 0; i < calcArray.length - 1; i++) {
    if (
      (calcArray[i] === "+") &&
      (calcArray[i + 1] === "+" || calcArray[i + 1] === "-")
    ) {
      calcArray.splice(i + 1, 0, 0);
      i=0;
    }
  }


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
          console.error("Division by zero!");
          result = Infinity;
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

export { onclickBtn };

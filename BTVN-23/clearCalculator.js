const clearCalculator = (state) => {
  state.tokens = [];
  state.charNum = [];
  state.numberChars = [];
  state.resultExport = 0;
  state.behindOp = false;
  state.expectNumber = true;
  state.waitingForSignedNumber = false;
  console.log("Calculator cleared");
};

export default clearCalculator;
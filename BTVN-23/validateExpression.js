const validateExpression = (state) => {
  if (state.numberChars.length === 0) return null;

  for (let i = 0; i < state.numberChars.length; i++) {
    if (state.numberChars[i] === "*" || state.numberChars[i] === "/") {
      if (i === state.numberChars.length - 1 && state.charNum.length === 0) {
        return "Lỗi: Biểu thức không hợp lệ. Kết thúc với phép nhân hoặc chia mà không có số sau.";
      }

      if (
        i < state.numberChars.length - 1 &&
        (state.numberChars[i + 1] === "*" || state.numberChars[i + 1] === "/")
      ) {
        return `Lỗi: Không thể sử dụng ${state.numberChars[i]}${state.numberChars[i + 1]} liên tiếp.`;
      }
    }
  }

  return null;
};

export default validateExpression;
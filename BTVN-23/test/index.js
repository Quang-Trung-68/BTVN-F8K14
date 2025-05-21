import {
  createCalculatorState,
  processCalculatorInput,
} from "./calculator/modules/calculatorMain.js";

// Khởi tạo state ban đầu
let calculatorState = createCalculatorState();

// Lưu kết quả hiển thị cho UI
let displayValue = "0";

// Hàm xử lý khi nhấn nút
function onclickBtn(value) {
  // Xử lý input và cập nhật state
  const result = processCalculatorInput(calculatorState, value);

  // Kiểm tra nếu có lỗi
  if (result.status === "error") {
    alert(result.errorMessage);
    return;
  }

  // Cập nhật state
  calculatorState = result;

  // Cập nhật giá trị hiển thị trên UI
  updateDisplay();
}

// Cập nhật hiển thị dựa trên state hiện tại
function updateDisplay() {
  if (calculatorState.charNum.length > 0) {
    // Hiển thị số đang nhập
    displayValue = calculatorState.charNum.join("");
  } else if (calculatorState.numberChars.length > 0) {
    // Hiển thị kết quả cuối cùng (nếu có)
    const lastItem =
      calculatorState.numberChars[calculatorState.numberChars.length - 1];
    if (typeof lastItem === "number") {
      displayValue = String(lastItem);
    }
  } else {
    // Mặc định hiển thị 0
    displayValue = "0";
  }

  // Cập nhật element hiển thị trên UI
  document.getElementById("calculator-display").textContent = displayValue;
}

// Export các hàm để sử dụng trong component khác
export { onclickBtn };

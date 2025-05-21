onclickBtn(value, state)
// ==========================================

/*
START onclickBtn(value)
  |
  |--> [Thêm value vào state.tokens]
  |
  |--> value là số?
  |     |
  |     |--> waitingForSignedNumber?
  |     |     |
  |     |     |--> [Tính tổng dấu từ charNum]
  |     |     |--> [Gán lại charNum thành giá trị số đã có dấu]
  |     |
  |     |--> [Thêm số vào charNum]
  |     |--> [Reset các flag]
  |
  |--> value là "."?
  |     |
  |     |--> Nếu chưa có ".", thêm "."
  |
  |--> value là phép toán? (+, -, *, /, =)
        |
        |--> value === "=" ?
        |     |
        |     |--> Nếu kết thúc bằng * hoặc / => Báo lỗi
        |     |--> Nếu đang nhập số: đưa vào numberChars
        |     |--> Gọi calculateResult()
        |     |--> Reset flag
        |
        |--> Nhập phép toán sau *, / ?
        |     |
        |     |--> Nếu value là + hoặc - thì xử lý dấu âm
        |
        |--> Đầu biểu thức?
        |     |
        |     |--> Nếu value là + hoặc - thì thêm vào charNum
        |
        |--> Đang nhập số?
        |     |
        |     |--> Đưa số vào numberChars
        |
        |--> charNum chỉ là dấu "-"?
        |     |--> return
        |
        |--> Gộp toán tử liên tiếp? (++ -- +- ...)
        |     |--> Tính toán lại dấu → thay thế operator
        |
        |--> behindOp = true?
        |     |--> Ghi đè operator trước đó
        |     |--> Ngược lại: thêm operator mới
        |
        |--> Reset flag
        |
  |--> value === "C" ?
        |
        |--> Gọi clearCalculator()
END
*/

calculateResult(state)
// ==========================================

/*
START calculateResult(state)
  |
  |--> Gọi validateExpression(state)
  |     |
  |     |--> Nếu có lỗi → alert → return
  |
  |--> Nếu kết thúc bằng + - * / → xóa
  |--> Nếu rỗng → return
  |
  |--> Tạo bản sao calcArray từ numberChars
  |
  |--> THỰC HIỆN * và /
  |     |
  |     |--> Duyệt calcArray
  |     |     |
  |     |     |--> Gặp * hoặc / → Tính toán → thay [a, op, b] bằng kết quả
  |
  |--> THỰC HIỆN + và -
  |     |
  |     |--> Duyệt calcArray
  |     |     |
  |     |     |--> Gặp + hoặc - → Tính toán → thay [a, op, b] bằng kết quả
  |
  |--> Lưu kết quả vào resultExport
  |--> Đặt numberChars = [result]
  |--> Reset charNum và flags
END
*/

validateExpression(state)
// ==========================================

/*
START validateExpression(state)
  |
  |--> Nếu numberChars rỗng → return null
  |
  |--> Duyệt numberChars:
  |     |
  |     |--> Nếu gặp * hoặc /:
  |           |
  |           |--> Nếu là phần tử cuối → lỗi
  |           |--> Nếu phía sau cũng là * hoặc / → lỗi
  |
  |--> return null (nếu hợp lệ)
END
*/


clearCalculator(state)
// ==========================================

/*
START clearCalculator(state)
  |
  |--> Reset:
  |     - tokens = []
  |     - charNum = []
  |     - numberChars = []
  |     - resultExport = 0
  |     - behindOp = false
  |     - expectNumber = true
  |     - waitingForSignedNumber = false
  |
  |--> In "Calculator cleared"
END
*/


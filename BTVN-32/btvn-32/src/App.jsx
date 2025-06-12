import { useState } from "react";

import "./App.css";

function App() {
  const styles = {
    container: {
      padding: "30px",
      maxWidth: "400px",
      margin: "50px auto",
      textAlign: "center",
      backgroundColor: "#f4f4f4",
      borderRadius: "12px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    title: {
      marginBottom: "20px",
      color: "#333",
    },
    input: {
      width: "80%",
      padding: "10px",
      margin: "8px 0",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
    },
    buttonGroup: {
      marginTop: "15px",
    },
    button: {
      padding: "10px 20px",
      margin: "6px",
      fontSize: "18px",
      cursor: "pointer",
      border: "none",
      backgroundColor: "#4CAF50",
      color: "white",
      borderRadius: "6px",
      transition: "background-color 0.3s",
    },
    clearButton: {
      marginTop: "15px",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      backgroundColor: "#f44336",
      color: "white",
      borderRadius: "6px",
      cursor: "pointer",
    },
    result: {
      marginTop: "20px",
      fontSize: "18px",
      color: "#222",
    },
  };

  let [num1, setNum1] = useState("");
  let [num2, setNum2] = useState("");
  let [result, setResult] = useState("Chưa có kết quả");

  const isValidInput = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    return !isNaN(n1) && !isNaN(n2) && num1.trim() !== "" && num2.trim() !== "";
  };

  const formatResult = (value) => {
    if (typeof value === "number") {
      // Avoid floating point error
      return Math.round(value * 100000000) / 100000000;
    }
    return value;
  };

  const calcAdd = () => {
    if (!isValidInput()) {
      setResult("Vui lòng nhập đầy đủ số");
      return;
    }
    setResult(formatResult(Number(num1) + Number(num2)));
  };

  const calcSub = () => {
    if (!isValidInput()) {
      setResult("Vui lòng nhập đầy đủ số");
      return;
    }
    setResult(formatResult(Number(num1) - Number(num2)));
  };

  const calcMul = () => {
    if (!isValidInput()) {
      setResult("Vui lòng nhập đầy đủ số");
      return;
    }
    setResult(formatResult(Number(num1) * Number(num2)));
  };

  const calcDiv = () => {
    if (!isValidInput()) {
      setResult("Vui lòng nhập đầy đủ số");
      return;
    }
    if (Number(num2) === 0) {
      setResult("Không thể chia cho 0");
      return;
    }
    const result = Number(num1) / Number(num2);
    setResult(formatResult(result));
  };

  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult("Chưa có kết quả");
  };
  return (
    <>
      <div style={styles.container}>
        <h2 style={styles.title}>Máy Tính Cơ Bản</h2>

        <input
          type="number"
          placeholder="Số thứ nhất"
          style={styles.input}
          onKeyDown={(e) => {
            if (["e", "E"].includes(e.key)) e.preventDefault();
          }}
          onChange={(e) => {
            setNum1(e.target.value);
          }}
          value={num1}
        />
        <input
          type="number"
          placeholder="Số thứ hai"
          style={styles.input}
          onKeyDown={(e) => {
            if (["e", "E"].includes(e.key)) e.preventDefault();
          }}
          onChange={(e) => {
            setNum2(e.target.value);
          }}
          value={num2}
        />

        <div style={styles.buttonGroup}>
          <button onClick={calcAdd} style={styles.button}>
            +
          </button>
          <button onClick={calcSub} style={styles.button}>
            −
          </button>
          <button onClick={calcMul} style={styles.button}>
            ×
          </button>
          <button onClick={calcDiv} style={styles.button}>
            ÷
          </button>
        </div>

        <div style={styles.result}>
          <strong>Kết quả:</strong> <span>{result}</span>
        </div>

        <button onClick={clearAll} style={styles.clearButton}>
          Clear
        </button>
      </div>
    </>
  );
}

export default App;

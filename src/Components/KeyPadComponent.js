import React from "react";
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";

function KeyPadComponent() {
  //funtions
  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  const inputNum = (e) => {
    if (curState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPreState("");
    }

    curState
      ? setCurState((pre) => pre + e.target.innerText)
      : setCurState(e.target.innerText);
    setTotal(false);
  };

  useEffect(() => {
    setInput(curState);
  }, [curState]);

  useEffect(() => {
    setInput("0");
  }, []);
  const operatorType = (e) => {
    setTotal(false);
    setOperator(e.target.innerText);
    if (curState === "") return;
    if (preState !== "") {
      equals();
    } else {
      setPreState(curState);
      setCurState("");
    }
  };

  const equals = (e) => {
    if (e?.target.innerText === "=") {
      setTotal(true);
    }

    let cal;
    switch (operator) {
      case "÷":
        cal = String(parseFloat(preState) / parseFloat(curState));
        break;

      case "+":
        cal = String(parseFloat(preState) + parseFloat(curState));
        break;
      case "x":
        cal = String(parseFloat(preState) * parseFloat(curState));
        break;
      case "-":
        cal = String(parseFloat(preState) - parseFloat(curState));
        break;
      default:
        return;
    }
    setInput("");
    setPreState(cal);
    setCurState("");
  };

  const reset = () => {
    setPreState("");
    setCurState("");
    setInput("0");
  };

  return (
    /*<!-- Calculator wrapper -->*/

    <div class="calculator">
      {/*<!-- calculator screen. disabled attribute prevents users from typing-->*/}

      <div className="calculator-screen">
        {input !== "" || input === "0" ? (
          <NumericFormat
            value={input}
            displayType={"text"}
            thousandSeparator={true}
          />
        ) : (
          <NumericFormat
            value={preState}
            displayType={"text"}
            thousandSeparator={true}
          />
        )}
      </div>

      {/*<!-- wrapper for calculator keys -->*/}
      <div class="calculator-keys">
        {/*<!-- buttons for operators + - * / -->*/}
        <button type="button" class="operator" value="+" onClick={operatorType}>
          +
        </button>
        <button type="button" class="operator" value="-" onClick={operatorType}>
          -
        </button>
        <button type="button" class="operator" value="*" onClick={operatorType}>
          x
        </button>
        <button type="button" class="operator" value="/" onClick={operatorType}>
          ÷
        </button>

        {/*<!-- Number buttons top most row left to right-->*/}
        <button type="button" value="7" onClick={inputNum}>
          7
        </button>
        <button type="button" value="8" onClick={inputNum}>
          8
        </button>
        <button type="button" value="9" onClick={inputNum}>
          9
        </button>

        {/*<!-- Number buttons middle row left to right -->*/}
        <button type="button" value="4" onClick={inputNum}>
          4
        </button>
        <button type="button" value="5" onClick={inputNum}>
          5
        </button>
        <button type="button" value="6" onClick={inputNum}>
          6
        </button>

        {/*!-- Number buttons lower row left to right -->*/}
        <button type="button" value="1" onClick={inputNum}>
          1
        </button>
        <button type="button" value="2" onClick={inputNum}>
          2
        </button>
        <button type="button" value="3" onClick={inputNum}>
          3
        </button>

        {/*<!-- rest of the numbers and utilities -->*/}
        <button type="button" value="0" onClick={inputNum}>
          0
        </button>
        <button type="button" class="decimal" value="." onClick={inputNum}>
          .
        </button>
        <button
          type="button"
          class="all-clear"
          value="all-clear"
          onClick={reset}
        >
          AC
        </button>
        <button
          type="button"
          class="operator"
          id="equal-sign"
          value="="
          onClick={equals}
        >
          =
        </button>
      </div>
    </div>
  );
}
export default KeyPadComponent;

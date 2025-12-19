import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Molecule from "./Molecule";

function App() {
  const [selection, setSelection] = useState(null);
  const [temp, setTemp] = useState(25);
  const solidMolecules = [];
  const liquidMolecules = [];
  const gasMolecules = [];

  const map = (value, in_min, in_max, out_min, out_max) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  let cnt = 0;
  for (let x = 13; x < 90; x += 12) {
    for (let y = 13; y < 90; y += 12) {
      cnt++;
      solidMolecules.push(
        <Molecule
          key={`${x}-${y}`}
          x={x}
          y={y}
          index={cnt}
          temp={temp}
          color="gold"
          name="S"
        />
      );
    }
  }

  cnt = 0;
  for (let x = 13; x < 90; x += map(temp, 0, 100, 12, 25)) {
    for (let y = 43; y < 90; y += map(temp, 0, 100, 12, 22)) {
      cnt++;
      liquidMolecules.push(
        <Molecule
          key={`${x}-${y}`}
          x={x}
          y={y}
          index={cnt}
          temp={temp}
          color="#1e90ff"
          name="L"
          isBoil={false}
        />
      );
    }
  }
  for (let i = 0; i < 5; i++) {
    liquidMolecules.push(
      <Molecule
        key={`B${i}`}
        x={10 * i + 25}
        y={70}
        index={i}
        temp={temp}
        color="#1e90ff"
        name="L"
        isBoil={true}
      />
    );
  }

  cnt = 0;
  for (let x = 13; x < 90; x += map(temp, 0, 100, 12, 25)) {
    for (let y = 13; y < 90; y += map(temp, 0, 100, 12, 22)) {
      cnt++;
      gasMolecules.push(
        <Molecule
          key={`${x}-${y}`}
          x={x}
          y={y}
          index={cnt}
          temp={temp}
          color="#32cd32"
          name="G"
          isBoil={false}
        />
      );
    }
  }

  const getBackground = (value) => {
    const percent = value;
    return {
      background: `linear-gradient(
        90deg,
        #1e90ff 0%,
        #1e90ff 0%,
        #32cd32 40%,
        #ffa500 70%,
        #ff4500 100%
      )`,
      backgroundSize: "100% 100%",
    };
  };

  return (
    <>
      <table dir="">
        <tr>
          <td>
            <h1 className="center-aligned">حالات المادة</h1>
          </td>
        </tr>
        <tr>
          <td className="right-aligned">
            <h2>وصف البرنامج</h2>
            <p>
              هذا البرنامج يعرض حالات المادة الثلاث: الصلبة، السائلة، والغازية.
              يمكنك التفاعل مع الأزرار أدناه لتغيير الحالة المعروضة.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <h2 className="right-aligned">قم باختيار حالة المادة</h2>
            <div className="states">
              <div
                className={`state ${selection === "solid" ? "selected" : ""}`}
                onClick={() => setSelection("solid")}
              >
                <img src="/rock.png" alt="صورة صلبة" width="100" />
                <caption>صخرة تمثل الحالة الصلبة</caption>
              </div>

              <div
                className={`state ${selection === "liquid" ? "selected" : ""}`}
                onClick={() => setSelection("liquid")}
              >
                <img src="/water.png" alt="صورة سائلة" width="100" />
                <caption>ماء يمثل الحالة السائلة</caption>
              </div>
              <div
                className={`state ${selection === "gas" ? "selected" : ""}`}
                onClick={() => setSelection("gas")}
              >
                <img src="/gas.png" alt="صورة غازية" width="100" />
                <caption>بخار يمثل الحالة الغازية</caption>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <svg viewBox="0 0 100 60">
              <g transform="translate(20, 5) scale(0.5)">
                {selection === "solid" && solidMolecules}
                {selection === "liquid" && liquidMolecules}
                {selection === "gas" && gasMolecules}

                <g className="cube">
                  <rect
                    x="5"
                    y="5"
                    width="80"
                    height="80"
                    stroke="lightblue"
                    fill="none"
                  />

                  <rect
                    x="15"
                    y="15"
                    width="80"
                    height="80"
                    stroke="lightblue"
                    fill="none"
                  />

                  <line x1="5" y1="5" x2="15" y2="15" stroke="lightblue" />
                  <line x1="85" y1="5" x2="95" y2="15" stroke="lightblue" />
                  <line x1="5" y1="85" x2="15" y2="95" stroke="lightblue" />
                  <line x1="85" y1="85" x2="95" y2="95" stroke="lightblue" />
                </g>
                <g className="solid-molecules"></g>
              </g>
            </svg>
          </td>
        </tr>
        <tr>
          <td>
            <div className="flex">
              <div className="value">{temp} °C</div>
              <h2>درجة الحرارة</h2>
            </div>

            <div style={{ width: 600 }}>
              <input
                type="range"
                min={0}
                max={100}
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                style={{
                  width: "100%",
                  height: 8,
                  borderRadius: 5,
                  appearance: "none",
                  ...getBackground(temp),
                }}
              />
            </div>
          </td>
        </tr>
      </table>
    </>
  );
}

export default App;

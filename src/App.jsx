import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Molecule from "./Molecule";
import rockImage from "/rock.png";
import waterImage from "/water.png";
import gasImage from "/gas.png";

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
  for (let i = 0; i <= map(temp, 90, 100, 1, 10); i++) {
    liquidMolecules.push(
      <Molecule
        key={`B${i}`}
        x={25 + 7 * i}
        y={70}
        index={i}
        temp={temp}
        color="#1e90ff"
        gasColor={"#32cd32"}
        name="L"
        isBoil={true}
      />
    );
  }

  cnt = 0;
  for (let x = 13; x < 90; x += map(temp, 0, 100, 22, 35)) {
    for (let y = 13; y < 90; y += map(temp, 0, 100, 22, 35)) {
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
        <tbody>
          <tr>
            <td>
              <h1 className="center-aligned">حالات المادة</h1>
              <p>إعداد / أحمد المطوع </p>
              <p>الصف الأول 3 - مدرسة الرواد الثانوية</p>
            </td>
          </tr>
          <tr>
            <td className="right-aligned">
              <h2>وصف البرنامج</h2>
              <p>
                هذا البرنامج يعرض حالات المادة الثلاث: الصلبة، السائلة،
                والغازية. يمكنك التفاعل مع الأزرار أدناه لتغيير الحالة المعروضة.
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
                  <img src={rockImage} alt="صورة صلبة" width="100" />
                  <div className="caption">صخرة تمثل الحالة الصلبة</div>
                </div>

                <div
                  className={`state ${
                    selection === "liquid" ? "selected" : ""
                  }`}
                  onClick={() => setSelection("liquid")}
                >
                  <img src={waterImage} alt="صورة سائلة" width="100" />
                  <div className="caption">ماء يمثل الحالة السائلة</div>
                </div>
                <div
                  className={`state ${selection === "gas" ? "selected" : ""}`}
                  onClick={() => setSelection("gas")}
                >
                  <img src={gasImage} alt="صورة غازية" width="100" />
                  <div className="caption">بخار يمثل الحالة الغازية</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <svg viewBox="0 0 100 60">
                <g transform="translate(20, 5) scale(0.6, 0.5)">
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
            <td dir="rtl">
              {selection === null && (
                <div className="center-aligned">
                  <h2>الرجاء اختيار حالة المادة أعلاه</h2>
                </div>
              )}
              {selection === "solid" && (
                <div className="center-aligned">
                  <h2>الحالة الصلبة: الجزيئات مترابطة بإحكام وتتحرك ببطء.</h2>
                  {temp < 50 && (
                    <p>درجة الحرارة منخفضة جدًا، الجزيئات لا تتحرك كثيرًا.</p>
                  )}
                  {temp >= 50 && temp < 100 && (
                    <p>
                      درجة الحرارة مرتفعة، الجزيئات تبدأ في الاهتزاز أكثر وقد
                      تبدأ في التحول إلى الحالة السائلة.
                    </p>
                  )}
                  {temp >= 100 && (
                    <p>
                      درجة الحرارة عالية جدًا، الجزيئات تهتز بشدة وتتحول إلى
                      الحالة السائلة.
                    </p>
                  )}
                </div>
              )}
              {selection === "liquid" && (
                <div className="center-aligned">
                  <h2>
                    الحالة السائلة: الجزيئات قريبة من بعضها البعض ولكنها تتحرك
                    بحرية.
                  </h2>
                  {temp <= 5 && (
                    <p>
                      درجة الحرارة منخفضة جدًا، الجزيئات تتحرك ببطء وقد تبدأ في
                      التجمد.
                    </p>
                  )}
                  {temp > 5 && temp < 30 && (
                    <p>
                      درجة الحرارة معتدلة، الجزيئات تتحرك بحرية ولكنها لا تزال
                      قريبة من بعضها البعض.
                    </p>
                  )}
                  {temp > 90 && temp < 100 && (
                    <p>
                      درجة الحرارة مرتفعة، الجزيئات تتحرك بسرعة وقد تبدأ في
                      التحول إلى الحالة الغازية.
                    </p>
                  )}
                  {temp === 100 && (
                    <p>
                      درجة الحرارة عند نقطة الغليان، الجزيئات تتحرك بسرعة كبيرة
                      وتتحول إلى الحالة الغازية.
                    </p>
                  )}
                </div>
              )}
              {selection === "gas" && (
                <div className="center-aligned">
                  <h2>الحالة الغازية: الجزيئات متباعدة وتتحرك بسرعة عالية.</h2>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex">
                <div className="value">
                  {temp * (selection === "solid" ? 10 : 1)} °C
                </div>
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
        </tbody>
      </table>
    </>
  );
}

export default App;

import React from "react";
import words from "./words";
const { useState, useEffect } = React;
function stored() {
  const x = localStorage.getItem("theme");
  if (x) {
    return x;
  }
  else {
    return "#ffffff";
  }
}
function x() {
  const stored = localStorage.getItem("first");
  if (stored) {
    return stored;
  }
}
function App() {
  const [theme, setTheme] = useState([
    "#ffffff", "#000000", "#176BEF", "#FF3E30", "#F7B529", "#179C52"
  ])
  const [color, setColor] = useState(stored());
  const [word, setWord] = useState([25, 50, 75, 100, 125, 150, 175, 200]);
  const [num, setNum] = useState(word[0]);
  const [counter, setCounter] = useState(0);
  const [value, setValue] = useState("");
  const [random, setRandom] = useState(Math.floor(Math.random() * 11154));
  const [all, setAll] = useState(0);
  const [count, setCount] = useState(["x", "y"]);
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 11154));
    if (value === words[random]) {
      setCounter(counter + 1);
      setAll(all + 1);
      setValue("");
      setCount([...count, words[random]]);
    }
  }, [value === words[random]]);
  const text = words[random];
  useEffect(() => {
    localStorage.setItem("theme", color);
  }, [color]);
  let [second, setSecond] = useState(0);
  const [check, setCheck] = useState("");
  function inputText(e) {
    setCheck("text");
  }
  if (check === "text") {
    setTimeout(() => {
      setSecond(second + 1);
    }, 1000)
  }
  let minutes = Math.floor((second) / 60);
  let seconds = second - (minutes * 60);
  if (counter >= num) {
    setCounter(0);
  }
  let n = counter + 1;
  const [toggle, setToggle] = useState(false);
  const champion = [100, 1000, 10000, 100000, 1000000, 10000000];
  let start = 0;
  let dis = count.length > 0 && count.reduce((data, index) => data + index).length - 2;
  let c = dis.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let wordInfos = all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  useEffect(() => {
    const x = localStorage.getItem("count");
    if (x) {
      setCount(JSON.parse(x));
    }
    else {
      setCount([]);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("count", JSON.stringify(count))
  }, [count]);
  useEffect(() => {
    const x = localStorage.getItem("word");
    if (x) {
      setAll(Number(x));
    }
    else {
      setAll(0);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("word", all);
  }, [all]);
  window.onkeydown = function(e) {
    if(e.keyCode == 123) {
      return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
      return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      return false;
    }
  }
  document.querySelector("html").oncontextmenu = () => { return false; }
  return (
    <main style={{background: color, color: color === "#ffffff" ? "#000000" : "#ffffff"}}>
      <header>
        <h1>Typing Zone</h1>
        <h1>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h1>
      </header>
      <div className="theme">
        {
          theme.map((data, index) => {
            return (
              <div key={index} style={{ width: "25px", height: "25px", background: data, cursor: "pointer", border: data === color ? "0.1em solid #eee": "", borderRadius: "50%", margin: "0 0.25em" }} onClick={() => {
                setColor(data);
              }}>
              </div>
            )
          })
        }
      </div>
      <div className="word">
        <div className="set">
          {
          word.map((data, index) => {
            return (
              <div key={index} className="set-words" onClick={() => {
                setNum(data);
                setCounter(0);
              }
              } style={{ background: num === data ? "#555" : "", boxShadow: num === data ? "0 3px 8px #555" : "", color: color === "#ffffff" && num === data ? "#ffffff" : "" }} title={"Words: " + data}>
                <h3>{data}</h3>
              </div>
            )
          })
        }
        </div>
      </div>
      <div className="type">
        {
          text.split("").map((data, index) => {
            return <h1 key={index} style={{color: value[index] === text[index] ? color === "#ffffff" ? "#888" : "#00FFFF" : ""}}>{data}</h1>
          })
        }
      </div>
      <div className="counter">
        <h1>{n < 10 ? "0" + n : n} / {num < 10 ? "0" + num : num}</h1>
      </div>
      <div className="enter">
        <input className={color === "#ffffff" || color === "#000000" ? "wb" : "next"} type="text" placeholder="Type here..." value={value} onChange={e => setValue(e.target.value)} style={{ color: color === "#ffffff" ? "#000000" : "#ffffff"}} onInput={inputText} />
      </div>
      <div className="end">
        <div className="total">
        <h1>Words: {wordInfos < 10 ? "0" + wordInfos : wordInfos}</h1>
        <h1>Characters: {c ? c < 10 ? "0" + c : c : start < 10 ? "0" + start : start}</h1>
      </div>
      </div>
      <div className={toggle ? "champ active" : "champ"}>
        <h1 id="c">🏆Characters</h1>
        {
          champion.reverse().map((data, index) => {
            return (
              <div key={index} className="leage" style={{backgroundColor: data <= count.reduce((data, index) => data + index).length ? "#888" : ""}}>
                <h1>{index + 1}</h1>
                <h1>{data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
              </div>
            )
          })
        }
        <button onClick={()=> setToggle(!toggle)}>close</button>
      </div>
      <div className="champion" onClick={() => setToggle(!toggle)}>
        <h1>🏆</h1>
      </div>
      <footer>
        <h1>&copy; 2022 {new Date().getFullYear() > 2022 ? "- " + new Date().getFullYear() : ""} Typing Zone by Pagnavath, All rights reserved.</h1>
      </footer>
    </main>
  )
}
export default App;
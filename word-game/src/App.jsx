import { useState, useEffect } from "react";
import "./styles.css"; // Global CSS file

const WORDS = {
  Hero: ["tech", "code", "java", "car", "bike", "city", "train", "robot"],
  Master: [
    "laptop",
    "react",
    "engine",
    "rocket",
    "bridge",
    "museum",
    "stadium",
  ],
  Legend: [
    "artificial",
    "blockchain",
    "automobile",
    "skyscraper",
    "metropolitan",
    "cyberspace",
  ],
};

export default function WordGame() {
  const [difficulty, setDifficulty] = useState("Hero");
  const [word, setWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("");
  const [time, setTime] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      setMessage("Time's up! Restarting...");
      resetGame();
    }
  }, [time]);

  function randomLetters() {
    const newWord =
      WORDS[difficulty][Math.floor(Math.random() * WORDS[difficulty].length)];
    setWord(newWord);
    setLetters(newWord.split("").sort(() => Math.random() - 0.5));
    setHint(newWord[0] + "...");
  }

  function checkWord() {
    if (input === word) {
      setScore(score + 10);
      setMessage("✅ Correct! +10 points");
      resetGame();
    } else {
      setMessage("❌ Wrong word! Try again.");
    }
    setInput("");
  }

  function resetGame() {
    setTime(30);
    randomLetters();
  }

  useEffect(() => {
    randomLetters();
  }, [difficulty]);

  return (
    <div className="container">
      <h1> Word Combination Game</h1>
      <p>
        Difficulty: <strong>{difficulty}</strong>
      </p>
      <div className="difficulty-buttons">
        {Object.keys(WORDS).map((level) => (
          <button
            key={level}
            className={`difficulty-btn ${level.toLowerCase()}`}
            onClick={() => setDifficulty(level)}
          >
            {level}
          </button>
        ))}
      </div>
      <p>
        ⏳ Time Left: <strong>{time}s</strong>
      </p>
      <div className="letters">
        🔡 Arrange these letters: <strong>{letters.join(" ")}</strong>
      </div>
      <p className="hint">💡 Hint: {hint}</p>
      <input
        type="text"
        className="word-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="submit-btn" onClick={checkWord}>
        🚀 Submit
      </button>
      <p className="message">{message}</p>
      <p className="score">🏆 Score: {score}</p>
    </div>
  );
}

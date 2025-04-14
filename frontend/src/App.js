import React, { useState, useEffect } from 'react';
import './App.css';
import { getQuote, getPythonTip, convertUnits, convertCurrency, makeTicTacToeMove } from './services/api';
const initialBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

function App() {
  const [quote, setQuote] = useState('');
  const [pythonTip, setPythonTip] = useState('');
  const [unitsResult, setUnitsResult] = useState(null);
  const [currencyResult, setCurrencyResult] = useState(null);
  
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState("X");
  const [message, setMessage] = useState("");
  // Fetch quote and Python tip when the component mounts
  useEffect(() => {
    getQuote().then((data) => setQuote(data.quote));
    getPythonTip().then((data) => setPythonTip(data.tip));
  }, []);

  const handleUnitConversion = () => {
    const data = { fromUnit: 'cm', toUnit: 'm', value: 1000 };
    convertUnits(data).then((result) => setUnitsResult(result.result));
  };

  const handleCurrencyConversion = () => {
    const data = { fromCurrency: 'USD', toCurrency: 'EUR', amount: 100 };
    convertCurrency(data).then((result) => setCurrencyResult(result.converted));
  };

  const handleMove = async() => {
    try {
      const result = await makeTicTacToeMove(board, player);
      setBoard(result.board);
      setMessage(result.message);
      setPlayer(player === "X" ? "O" : "X");
    } catch (err) {
      console.error(err);
      setMessage("Error making move ");
    }
  };

  return (
    <div className="App">
      <h1>Smart Toolkit</h1>

      <div className="section">
        <h2>Quote</h2>
        <p>{ quote}</p>
      </div>

      <div className="section">
        <h2>Python Tip</h2>
        <p>{pythonTip}</p>
      </div>

      <div className="section">
        <h2>Convert Units</h2>
        <button onClick={handleUnitConversion}>Convert 1000 meters to kilometers</button>
        <p>{unitsResult ? `Result: ${unitsResult}` : ''}</p>
      </div>

      <div className="section">
        <h2>Convert Currency</h2>
        <button onClick={handleCurrencyConversion}>Convert 100 USD to EUR</button>
        <p>{currencyResult ? `Result: ${currencyResult}` : ''}</p>
      </div>

      <div className="section">
        <h2>Tic Tac Toe</h2>
        <button onClick={handleMove}>Make Move</button>
        <p>{message}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)" }}>
          {board.flat().map((cell, idx) => (
            <div key={idx} style={{ border: "1px solid #333", padding: "20px", textAlign: "center" }}>
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

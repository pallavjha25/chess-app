import React, { useState, useCallback } from 'react';
import ChessBoard from './components/ChessBoard';
import PlayerInfo from './components/PlayerInfo';
import { ChessPiece } from './utils/chessTypes';
import './App.css';

function App() {
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [resetKey, setResetKey] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [capturedPieces, setCapturedPieces] = useState<{white: ChessPiece[], black: ChessPiece[]}>({
    white: [],
    black: []
  });

  const handleMove = (capturedPiece: ChessPiece | null) => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    if (capturedPiece) {
      setCapturedPieces(prev => ({
        ...prev,
        [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece]
      }));
    }
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  const handleReset = useCallback(() => {
    setCurrentPlayer('white');
    setResetKey(prevKey => prevKey + 1);
    setGameStarted(false);
    setCapturedPieces({ white: [], black: [] });
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>Chess Master</h1>
        <button className="reset-button" onClick={handleReset}>
          <span className="reset-icon">↺</span>
          <span className="reset-text">New Game</span>
        </button>
      </div>
      <div className="game-container">
        <PlayerInfo
          key={`player2-${resetKey}`}
          name={player2}
          setName={setPlayer2}
          color="black"
          isCurrentPlayer={currentPlayer === 'black'}
          gameStarted={gameStarted}
          capturedPieces={capturedPieces.white}
        />
        <ChessBoard key={`board-${resetKey}`} onMove={handleMove} currentPlayer={currentPlayer} />
        <PlayerInfo
          key={`player1-${resetKey}`}
          name={player1}
          setName={setPlayer1}
          color="white"
          isCurrentPlayer={currentPlayer === 'white'}
          gameStarted={gameStarted}
          capturedPieces={capturedPieces.black}
        />
      </div>
    </div>
  );
}

export default App;

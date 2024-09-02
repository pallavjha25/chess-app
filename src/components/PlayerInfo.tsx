import React, { useState, useEffect } from 'react';
import { ChessPiece } from '../utils/chessTypes';
import '../styles/PlayerInfo.css';

interface PlayerInfoProps {
  name: string;
  setName: (name: string) => void;
  color: 'white' | 'black';
  isCurrentPlayer: boolean;
  gameStarted: boolean;
  capturedPieces: ChessPiece[];
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ 
  name, 
  setName, 
  color, 
  isCurrentPlayer, 
  gameStarted,
  capturedPieces 
}) => {
  const [time, setTime] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && isCurrentPlayer) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCurrentPlayer, gameStarted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPieceSymbol = (piece: ChessPiece | null) => {
    if (!piece) return '';
    
    const symbols: { [key: string]: string } = {
      'white-pawn': '♙', 'white-rook': '♖', 'white-knight': '♘',
      'white-bishop': '♗', 'white-queen': '♕', 'white-king': '♔',
      'black-pawn': '♟', 'black-rook': '♜', 'black-knight': '♞',
      'black-bishop': '♝', 'black-queen': '♛', 'black-king': '♚'
    };
    return symbols[`${piece.color}-${piece.type}`] || '';
  };

  return (
    <div className={`player-info ${color} ${isCurrentPlayer && gameStarted ? 'active' : ''}`}>
      {isEditing ? (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        <h2 onClick={() => setIsEditing(true)}>{name}</h2>
      )}
      <p className="time">{formatTime(time)}</p>
      <div className="captured-pieces">
        {capturedPieces.map((piece, index) => (
          piece && (
            <span key={index} className={`captured-piece ${piece.color}`}>
              {getPieceSymbol(piece)}
            </span>
          )
        ))}
      </div>
    </div>
  );
};

export default PlayerInfo;
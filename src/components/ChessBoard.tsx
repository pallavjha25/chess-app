import React, { useState } from 'react';
import { initialBoard, movePiece, getPossibleMoves } from '../utils/chessLogic';
import { ChessPiece as ChessPieceType } from '../utils/chessTypes';
import '../styles/ChessBoard.css';

interface ChessBoardProps {
  onMove: (capturedPiece: ChessPieceType | null) => void;
  currentPlayer: 'white' | 'black';
}

const ChessBoard: React.FC<ChessBoardProps> = ({ onMove, currentPlayer }) => {
  const [board, setBoard] = useState(initialBoard());
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<[number, number][]>([]);

  const handleSquareClick = (row: number, col: number) => {
    const piece = board[row][col];

    if (selectedPiece) {
      const [fromRow, fromCol] = selectedPiece;
      const newBoard = movePiece(board, selectedPiece, [row, col]);
      if (newBoard) {
        const capturedPiece = board[row][col];
        setBoard(newBoard);
        setSelectedPiece(null);
        setPossibleMoves([]);
        onMove(capturedPiece);
      }
    } else if (piece && piece.color === currentPlayer) {
      setSelectedPiece([row, col]);
      setPossibleMoves(getPossibleMoves(board, [row, col]));
    }
  };

  const isHighlighted = (row: number, col: number) => {
    return possibleMoves.some(([r, c]) => r === row && c === col);
  };

  const getPieceSymbol = (piece: ChessPieceType | null) => {
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
    <div className="chess-board">
      {board.map((row, rowIndex) => (
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'} ${isHighlighted(rowIndex, colIndex) ? `highlighted ${currentPlayer}` : ''}`}
            onClick={() => handleSquareClick(rowIndex, colIndex)}
          >
            {piece && (
              <div className={`chess-piece ${piece.color}`}>
                {getPieceSymbol(piece)}
              </div>
            )}
          </div>
        ))
      ))}
    </div>
  );
};

export default ChessBoard;
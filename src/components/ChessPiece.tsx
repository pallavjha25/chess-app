import React from 'react';
import { PieceType, PieceColor } from '../utils/chessTypes';

interface ChessPieceProps {
  piece: {
    type: PieceType;
    color: PieceColor;
  };
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece }) => {
  const getPieceSymbol = () => {
    switch (piece.type) {
      case 'pawn': return piece.color === 'white' ? '♙' : '♟';
      case 'rook': return piece.color === 'white' ? '♖' : '♜';
      case 'knight': return piece.color === 'white' ? '♘' : '♞';
      case 'bishop': return piece.color === 'white' ? '♗' : '♝';
      case 'queen': return piece.color === 'white' ? '♕' : '♛';
      case 'king': return piece.color === 'white' ? '♔' : '♚';
    }
  };

  return <div className={`chess-piece ${piece.color}`}>{getPieceSymbol()}</div>;
};

export default ChessPiece;
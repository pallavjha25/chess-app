export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export type ChessPiece = {
  type: PieceType;
  color: PieceColor;
} | null;

export type ChessBoard = ChessPiece[][];
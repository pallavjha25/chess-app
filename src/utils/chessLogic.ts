import { PieceType, PieceColor, ChessBoard } from './chessTypes';

export const initialBoard = (): ChessBoard => {
  const emptyRow = Array(8).fill(null);
  const pawnRow = (color: PieceColor): ChessBoard[number] =>
    Array(8).fill({ type: 'pawn', color });

  return [
    [
      { type: 'rook', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'queen', color: 'black' },
      { type: 'king', color: 'black' },
      { type: 'bishop', color: 'black' },
      { type: 'knight', color: 'black' },
      { type: 'rook', color: 'black' },
    ],
    pawnRow('black'),
    ...Array(4).fill(emptyRow),
    pawnRow('white'),
    [
      { type: 'rook', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'queen', color: 'white' },
      { type: 'king', color: 'white' },
      { type: 'bishop', color: 'white' },
      { type: 'knight', color: 'white' },
      { type: 'rook', color: 'white' },
    ],
  ];
};

export const movePiece = (
  board: ChessBoard,
  from: [number, number],
  to: [number, number]
): ChessBoard | null => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const piece = board[fromRow][fromCol];

  if (!piece || !isValidMove(board, from, to)) {
    return null;
  }

  const newBoard = board.map(row => [...row]);
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;

  return newBoard;
};

const isValidMove = (
  board: ChessBoard,
  from: [number, number],
  to: [number, number]
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const piece = board[fromRow][fromCol];
  const targetPiece = board[toRow][toCol];

  if (!piece) return false;
  if (targetPiece && targetPiece.color === piece.color) return false;

  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);

  switch (piece.type) {
    case 'pawn':
      if (piece.color === 'white') {
        if (fromRow === 6 && toRow === 4 && fromCol === toCol && !board[5][toCol] && !targetPiece) return true;
        return toRow === fromRow - 1 && (toCol === fromCol || (Math.abs(toCol - fromCol) === 1 && targetPiece !== null));
      } else {
        if (fromRow === 1 && toRow === 3 && fromCol === toCol && !board[2][toCol] && !targetPiece) return true;
        return toRow === fromRow + 1 && (toCol === fromCol || (Math.abs(toCol - fromCol) === 1 && targetPiece !== null));
      }
    case 'rook':
      return (rowDiff === 0 || colDiff === 0) && !hasObstacles(board, from, to);
    case 'knight':
      return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    case 'bishop':
      return rowDiff === colDiff && !hasObstacles(board, from, to);
    case 'queen':
      return (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) && !hasObstacles(board, from, to);
    case 'king':
      return rowDiff <= 1 && colDiff <= 1;
    default:
      return false;
  }
};

const hasObstacles = (
  board: ChessBoard,
  from: [number, number],
  to: [number, number]
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
  const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;

  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol] !== null) {
      return true;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }

  return false;
};

export const getPossibleMoves = (board: ChessBoard, position: [number, number]): [number, number][] => {
  const [row, col] = position;
  const piece = board[row][col];
  if (!piece) return [];

  const possibleMoves: [number, number][] = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (isValidMove(board, [row, col], [i, j])) {
        possibleMoves.push([i, j]);
      }
    }
  }

  return possibleMoves;
};
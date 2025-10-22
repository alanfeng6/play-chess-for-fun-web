export const VERTICAL_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const HORIZONTAL_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export function samePosition(p1: Position, p2: Position) {
    return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum PieceType {
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
}

export enum Color {
  black,
  white,
}

export interface Piece {
  image: string;
  position: Position;
  type: PieceType;
  color: Color;
  enPassant?: boolean;
}

export const initialBoardState: Piece[] = [
  {
    image: "./black_rook.png",
    position: {
      x: 0,
      y: 7,
    },
    type: PieceType.rook,
    color: Color.black,
  },
  {
    image: "./black_knight.png",
    position: {
      x: 1,
      y: 7,
    },
    type: PieceType.knight,
    color: Color.black,
  },
  {
    image: "./black_bishop.png",
    position: {
      x: 2,
      y: 7,
    },
    type: PieceType.bishop,
    color: Color.black,
  },
  {
    image: "./black_queen.png",
    position: {
      x: 3,
      y: 7,
    },
    type: PieceType.queen,
    color: Color.black,
  },
  {
    image: "./black_king.png",
    position: {
      x: 4,
      y: 7,
    },
    type: PieceType.king,
    color: Color.black,
  },
  {
    image: "./black_bishop.png",
    position: {
      x: 5,
      y: 7,
    },
    type: PieceType.bishop,
    color: Color.black,
  },
  {
    image: "./black_knight.png",
    position: {
      x: 6,
      y: 7,
    },
    type: PieceType.knight,
    color: Color.black,
  },
  {
    image: "./black_rook.png",
    position: {
      x: 7,
      y: 7,
    },
    type: PieceType.rook,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 0,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 1,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 2,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 3,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 4,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 5,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 6,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./black_pawn.png",
    position: {
      x: 7,
      y: 6,
    },
    type: PieceType.pawn,
    color: Color.black,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 0,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 1,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 2,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 3,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 4,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 5,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 6,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_pawn.png",
    position: {
      x: 7,
      y: 1,
    },
    type: PieceType.pawn,
    color: Color.white,
  },
  {
    image: "./white_rook.png",
    position: {
      x: 0,
      y: 0,
    },
    type: PieceType.rook,
    color: Color.white,
  },
  {
    image: "./white_knight.png",
    position: {
      x: 1,
      y: 0,
    },
    type: PieceType.knight,
    color: Color.white,
  },
  {
    image: "./white_bishop.png",
    position: {
      x: 2,
      y: 0,
    },
    type: PieceType.bishop,
    color: Color.white,
  },
  {
    image: "./white_queen.png",
    position: {
      x: 3,
      y: 0,
    },
    type: PieceType.queen,
    color: Color.white,
  },
  {
    image: "./white_king.png",
    position: {
      x: 4,
      y: 0,
    },
    type: PieceType.king,
    color: Color.white,
  },
  {
    image: "./white_bishop.png",
    position: {
      x: 5,
      y: 0,
    },
    type: PieceType.bishop,
    color: Color.white,
  },
  {
    image: "./white_knight.png",
    position: {
      x: 6,
      y: 0,
    },
    type: PieceType.knight,
    color: Color.white,
  },
  {
    image: "./white_rook.png",
    position: {
      x: 7,
      y: 0,
    },
    type: PieceType.rook,
    color: Color.white,
  },
];

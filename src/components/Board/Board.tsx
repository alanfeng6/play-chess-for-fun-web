import { useRef, useState } from "react";
import Square from "../Square/Square";
import "./Board.css";
import Rules from "../../Rules/Rules";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece {
  image: string;
  x: number;
  y: number;
  type: PieceType;
  color: Color;
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

const initialBoardState: Piece[] = [];

for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "./black_pawn.png",
    x: i,
    y: 6,
    type: PieceType.pawn,
    color: Color.black,
  });
}
for (let i = 0; i < 8; i++) {
  initialBoardState.push({
    image: "./white_pawn.png",
    x: i,
    y: 1,
    type: PieceType.pawn,
    color: Color.white,
  });
}
for (let p = 0; p < 2; p++) {
  const color = p === 0 ? Color.black : Color.white;
  const type = color === Color.black ? "black" : "white";
  const y = color === Color.black ? 7 : 0;

  initialBoardState.push({
    image: `./${type}_rook.png`,
    x: 0,
    y,
    type: PieceType.rook,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_rook.png`,
    x: 7,
    y,
    type: PieceType.rook,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_knight.png`,
    x: 1,
    y,
    type: PieceType.knight,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_knight.png`,
    x: 6,
    y,
    type: PieceType.knight,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_bishop.png`,
    x: 2,
    y,
    type: PieceType.bishop,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_bishop.png`,
    x: 5,
    y,
    type: PieceType.bishop,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_queen.png`,
    x: 3,
    y,
    type: PieceType.queen,
    color: color,
  });
  initialBoardState.push({
    image: `./${type}_king.png`,
    x: 4,
    y,
    type: PieceType.king,
    color: color,
  });
}

const Board = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [prevX, setPrevX] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const boardRef = useRef<HTMLDivElement>(null);
  const rules = new Rules();

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const board = boardRef.current;
    if (element.classList.contains("piece") && board) {
      setPrevX(Math.floor((e.clientX - board.offsetLeft) / 100));
      setPrevY(Math.abs(Math.ceil((e.clientY - board.offsetTop - 800) / 100)));
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      setActivePiece(element);
    }
  }

  function movePiece(e: React.MouseEvent) {
    const board = boardRef.current;
    if (activePiece && board) {
      const minX = board.offsetLeft - 25;
      const minY = board.offsetTop - 25;
      const maxX = board.offsetLeft + board.clientWidth - 75;
      const maxY = board.offsetTop + board.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }
      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const board = boardRef.current;
    if (activePiece && board) {
      const x = Math.floor((e.clientX - board.offsetLeft) / 100);
      const y = Math.abs(Math.ceil((e.clientY - board.offsetTop - 800) / 100));

      const currentPiece = pieces.find((p) => p.x === prevX && p.y === prevY);
      const capturedPiece = pieces.find((p) => p.x === x && p.y === y);

      if (currentPiece) {
        const legalMove = rules.isLegalMove(
          prevX,
          prevY,
          x,
          y,
          currentPiece.type,
          currentPiece.color,
          pieces
        );
        // set piece position
        if (legalMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === prevX && piece.y === prevY) {
              piece.x = x;
              piece.y = y;
              results.push(piece);
            } else if (!(piece.x === x && piece.y === y)) {
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else {
          // reset piece position
          activePiece.style.position = "relative";
          activePiece.style.removeProperty("top");
          activePiece.style.removeProperty("left");
        }
      }
      setActivePiece(null);
    }
  }
  let board = [];
  for (let i = verticalAxis.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontalAxis.length; j++) {
      const num = i + j;
      let image = undefined;
      pieces.forEach((p) => {
        if (p.x === j && p.y === i) {
          image = p.image;
        }
      });
      board.push(<Square key={`${j},${i}`} num={num} image={image} />);
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="board"
      ref={boardRef}
    >
      {board}
    </div>
  );
};

export default Board;

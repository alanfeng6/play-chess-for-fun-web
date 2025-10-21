import { useRef, useState } from "react";
import Square from "../Square/Square";
import "./Board.css";

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const initialBoardState: Piece[] = [];

    for (let i = 0; i < 8; i++) {
      initialBoardState.push({ image: "./black_pawn.png", x: i, y: 6 });
    }
    for (let i = 0; i < 8; i++) {
      initialBoardState.push({ image: "./white_pawn.png", x: i, y: 1 });
    }
    for (let p = 0; p < 2; p++) {
      const type = p === 0 ? "black" : "white";
      const y = p === 0 ? 7 : 0;

      initialBoardState.push({ image: `./${type}_rook.png`, x: 0, y });
      initialBoardState.push({ image: `./${type}_rook.png`, x: 7, y });
      initialBoardState.push({ image: `./${type}_knight.png`, x: 1, y });
      initialBoardState.push({ image: `./${type}_knight.png`, x: 6, y });
      initialBoardState.push({ image: `./${type}_bishop.png`, x: 2, y });
      initialBoardState.push({ image: `./${type}_bishop.png`, x: 5, y });
      initialBoardState.push({ image: `./${type}_queen.png`, x: 3, y });
      initialBoardState.push({ image: `./${type}_king.png`, x: 4, y });
    }

const Board = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const boardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const board = boardRef.current;
    if (element.classList.contains("piece") && board) {
      setGridX(Math.floor((e.clientX - board.offsetLeft) / 100));
      setGridY(Math.abs(Math.ceil((e.clientY - board.offsetTop - 800) / 100)));
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
      setPieces(value => {
        const pieces = value.map(p => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        })
        return pieces;
      })
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

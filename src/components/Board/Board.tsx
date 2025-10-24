import { useRef, useState } from "react";
import Square from "../square/Square";
import "./Board.css";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
} from "../../Constants";

import { Piece, Position } from "../../models";

interface Props {
  playMove: (piece: Piece, position: Position) => boolean;
  pieces: Piece[];
}

const Board = ({ playMove, pieces }: Props) => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [prevPosition, setPrevPosition] = useState<Position>(
    new Position(-1, -1)
  );
  const boardRef = useRef<HTMLDivElement>(null);

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const board = boardRef.current;
    if (element.classList.contains("piece") && board) {
      const prevX = Math.floor((e.clientX - board.offsetLeft) / GRID_SIZE);
      const prevY = Math.abs(
        Math.ceil((e.clientY - board.offsetTop - 800) / GRID_SIZE)
      );
      setPrevPosition(new Position(prevX, prevY));
      const x = e.clientX - GRID_SIZE / 2;
      const y = e.clientY - GRID_SIZE / 2;
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
      const x = Math.floor((e.clientX - board.offsetLeft) / GRID_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - board.offsetTop - 800) / GRID_SIZE)
      );

      const currentPiece = pieces.find((p) =>
        p.samePosition(prevPosition)
      );

      if (currentPiece) {
        var success = playMove(currentPiece.clone(), new Position(x, y));
        if (!success) {
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
  for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const num = i + j;
      const piece = pieces.find((p) =>
        p.samePosition(new Position(j, i))
      );
      let image = piece ? piece.image : undefined;
      let currentPiece =
        activePiece !== null
          ? pieces.find((p) => p.samePosition(prevPosition))
          : undefined;
      let highlight = currentPiece?.legalMoves
        ? currentPiece.legalMoves.some((p) =>
            p.samePosition(new Position(j, i))
          )
        : false;
      board.push(
        <Square
          key={`${j},${i}`}
          num={num}
          image={image}
          highlight={highlight}
        />
      );
    }
  }
  return (
    <>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id="board"
        ref={boardRef}
      >
        {board}
      </div>
    </>
  );
};

export default Board;

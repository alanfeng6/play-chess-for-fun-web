import { useRef, useState } from "react";
import Square from "../Square/Square";
import "./Board.css";
import Rules from "../../Rules/Rules";
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  Piece,
  PieceType,
  Color,
  initialBoardState,
  Position,
  GRID_SIZE,
  samePosition,
} from "../../Constants";

const Board = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [prevPosition, setPrevPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const boardRef = useRef<HTMLDivElement>(null);
  const rules = new Rules();

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const board = boardRef.current;
    if (element.classList.contains("piece") && board) {
      const prevX = Math.floor((e.clientX - board.offsetLeft) / GRID_SIZE);
      const prevY = Math.abs(
        Math.ceil((e.clientY - board.offsetTop - 800) / GRID_SIZE)
      );
      setPrevPosition({
        x: prevX,
        y: prevY,
      });
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

      const currentPiece = pieces.find(
        (p) =>
          samePosition(p.position, prevPosition)
      );

      if (currentPiece) {
        const legalMove = rules.isLegalMove(
          prevPosition,
          {x,y},
          currentPiece.type,
          currentPiece.color,
          pieces
        );
        const isEnPassant = rules.isEnPassant(
          prevPosition,
          {x,
          y,},
          currentPiece.type,
          currentPiece.color,
          pieces
        );
        const pawnDirection = currentPiece.color === Color.white ? 1 : -1;
        if (isEnPassant) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (
              samePosition(piece.position, prevPosition)
            ) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, {x, y: y - pawnDirection})
            ) {
              if (piece.type === PieceType.pawn) {
                piece.enPassant = false;
              }
              results.push(piece);
            }
            return results;
          }, [] as Piece[]);
          setPieces(updatedPieces);
        } else if (legalMove) {
          // set piece position
          const updatedPieces = pieces.reduce((results, piece) => {
            if (
              samePosition(piece.position, prevPosition)
            ) {
              // check if piece is en passantable
              piece.enPassant = (
                Math.abs(prevPosition.y - y) === 2 &&
                piece.type === PieceType.pawn
              );
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (!samePosition(piece.position, {x, y})) {
              if (piece.type === PieceType.pawn) {
                piece.enPassant = false;
              }
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
  for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const num = i + j;
      const piece = pieces.find(
        (p) => samePosition(p.position, {x: j, y: i})
      );
      let image = piece ? piece.image : undefined;
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

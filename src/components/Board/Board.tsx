import { useRef, useState } from "react";
import Square from "../square/Square";
import "./Board.css";
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
import Movement from "../../Movement/Movement";

const Board = () => {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [promotedPawn, setPromotedPawn] = useState<Piece>();
  const [prevPosition, setPrevPosition] = useState<Position>({ x: -1, y: -1 });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const boardRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const movement = new Movement();

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

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, prevPosition)
      );

      if (currentPiece) {
        const legalMove = movement.isLegalMove(
          prevPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );
        const isEnPassant = movement.isEnPassant(
          prevPosition,
          { x, y },
          currentPiece.type,
          currentPiece.color,
          pieces
        );
        const pawnDirection = currentPiece.color === Color.white ? 1 : -1;
        if (isEnPassant) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, prevPosition)) {
              piece.enPassant = false;
              piece.position.x = x;
              piece.position.y = y;
              results.push(piece);
            } else if (
              !samePosition(piece.position, { x, y: y - pawnDirection })
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
            if (samePosition(piece.position, prevPosition)) {
              // check if piece is en passantable
              piece.enPassant =
                Math.abs(prevPosition.y - y) === 2 &&
                piece.type === PieceType.pawn;
              piece.position.x = x;
              piece.position.y = y;
              // check for promotion
              let promRow = piece.color === Color.white ? 7 : 0;
              if (y === promRow && piece.type === PieceType.pawn) {
                selectRef.current?.classList.remove("hidden");
                setPromotedPawn(piece);
              }
              results.push(piece);
            } else if (!samePosition(piece.position, { x, y })) {
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

  function promote(type: PieceType) {
    if (promotedPawn === undefined) {
      return;
    }
    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotedPawn.position)) {
        piece.type = type;
        const color = piece.color === Color.white ? "white" : "black";
        let pieceType = "";
        switch (type) {
          case PieceType.queen:
            pieceType = "queen";
            break;
          case PieceType.rook:
            pieceType = "rook";
            break;
          case PieceType.bishop:
            pieceType = "bishop";
            break;
          case PieceType.knight:
            pieceType = "knight";
            break;
        }
        piece.image = `./${color}_${pieceType}.png`;
      }
      results.push(piece);
      return results;
    }, [] as Piece[]);
    setPieces(updatedPieces);
    selectRef.current?.classList.add("hidden");
  }

  function promColor() {
    return (promotedPawn?.color === Color.white) ? "white" : "black";
  }

  let board = [];
  for (let i = VERTICAL_AXIS.length - 1; i >= 0; i--) {
    for (let j = 0; j < HORIZONTAL_AXIS.length; j++) {
      const num = i + j;
      const piece = pieces.find((p) =>
        samePosition(p.position, { x: j, y: i })
      );
      let image = piece ? piece.image : undefined;
      board.push(<Square key={`${j},${i}`} num={num} image={image} />);
    }
  }
  return (
    <>
      <div id="pawn-prom-select" className="hidden" ref={selectRef}>
        <div className="select-body">
          <img
            onClick={() => promote(PieceType.queen)}
            src={`${promColor()}_queen.png`}
          ></img>
          <img
            onClick={() => promote(PieceType.rook)}
            src={`${promColor()}_rook.png`}
          ></img>
          <img
            onClick={() => promote(PieceType.bishop)}
            src={`${promColor()}_bishop.png`}
          ></img>
          <img
            onClick={() => promote(PieceType.knight)}
            src={`${promColor()}_knight.png`}
          ></img>
        </div>
      </div>
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

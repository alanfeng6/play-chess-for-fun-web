import { useEffect, useRef, useState } from "react";
import { initialBoardState } from "../../Constants";
import Board from "../Board/Board";
import {
  bishopMove,
  getLegalBishopMoves,
  getLegalKingMoves,
  getLegalKnightMoves,
  getLegalPawnMoves,
  getLegalQueenMoves,
  getLegalRookMoves,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from "../../Movement/rules";
import { Piece, Position } from "../../models";
import { Color, PieceType } from "../../Types";
import { Pawn } from "../../models/Pawn";

const Movement = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const [promotedPawn, setPromotedPawn] = useState<Piece>();
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateLegalMoves();
  }, []);
  function updateLegalMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.legalMoves = getLegalMoves(p, currentPieces);
        return p;
      });
    });
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
    const legalMove = isLegalMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.color
    );
    const enPassant = isEnPassant(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.color
    );
    const pawnDirection = playedPiece.color === Color.white ? 1 : -1;
    if (enPassant) {
      const updatedPieces = pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }

          piece.position.x = destination.x;
          piece.position.y = destination.y;
          results.push(piece);
        } else if (
          !piece.samePosition(
            new Position(destination.x, destination.y - pawnDirection)
          )
        ) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      updateLegalMoves();
      setPieces(updatedPieces);
    } else if (legalMove) {
      // set piece position
      const updatedPieces = pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          // check if piece is en passantable
          if (piece.isPawn) {
            (piece as Pawn).enPassant =
              Math.abs(playedPiece.position.y - destination.y) === 2 &&
              piece.type === PieceType.pawn;
          }

          piece.position.x = destination.x;
          piece.position.y = destination.y;
          // check for promotion
          let promRow = piece.color === Color.white ? 7 : 0;
          if (destination.y === promRow && piece.type === PieceType.pawn) {
            selectRef.current?.classList.remove("hidden");
            setPromotedPawn(piece);
          }
          results.push(piece);
        } else if (
          !piece.samePosition(new Position(destination.x, destination.y))
        ) {
          if (piece.isPawn) {
            (piece as Pawn).enPassant = false;
          }
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      updateLegalMoves();
      setPieces(updatedPieces);
    } else {
      return false;
    }
    return true;
  }

  function isEnPassant(
    prevPosition: Position,
    position: Position,
    type: PieceType,
    color: Color
  ): boolean {
    const pawnDirection = color === Color.white ? 1 : -1;
    if (type === PieceType.pawn) {
      if (
        (prevPosition.x - position.x === 1 ||
          position.x - prevPosition.x === 1) &&
        position.y - prevPosition.y === pawnDirection
      ) {
        const piece = pieces.find(
          (p) =>
            p.position.x === position.x &&
            p.position.y === position.y - pawnDirection &&
            p.isPawn &&
            (p as Pawn).enPassant
        );
        if (piece) {
          return true;
        }
      }
    }
    return false;
  }

  function isLegalMove(
    prevPosition: Position,
    position: Position,
    type: PieceType,
    color: Color
  ): boolean {
    let legalMove = false;
    switch (type) {
      case PieceType.pawn:
        legalMove = pawnMove(prevPosition, position, color, pieces);
        break;
      case PieceType.knight:
        legalMove = knightMove(prevPosition, position, color, pieces);
        break;
      case PieceType.bishop:
        legalMove = bishopMove(prevPosition, position, color, pieces);
        break;
      case PieceType.rook:
        legalMove = rookMove(prevPosition, position, color, pieces);
        break;
      case PieceType.queen:
        legalMove = queenMove(prevPosition, position, color, pieces);
        break;
      case PieceType.king:
        legalMove = kingMove(prevPosition, position, color, pieces);
    }
    return legalMove;
  }

  function getLegalMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.pawn:
        return getLegalPawnMoves(piece, boardState);
      case PieceType.knight:
        return getLegalKnightMoves(piece, boardState);
      case PieceType.bishop:
        return getLegalBishopMoves(piece, boardState);
      case PieceType.rook:
        return getLegalRookMoves(piece, boardState);
      case PieceType.queen:
        return getLegalQueenMoves(piece, boardState);
      case PieceType.king:
        return getLegalKingMoves(piece, boardState);
      default:
        return [];
    }
  }

  function promote(type: PieceType) {
    if (promotedPawn === undefined) {
      return;
    }
    const updatedPieces = pieces.reduce((results, piece) => {
      if (piece.samePiecePosition(promotedPawn)) {
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
    updateLegalMoves();
    setPieces(updatedPieces);
    selectRef.current?.classList.add("hidden");
  }

  function promColor() {
    return promotedPawn?.color === Color.white ? "white" : "black";
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
      <Board playMove={playMove} pieces={pieces} />
    </>
  );
};

export default Movement;

import { useEffect, useRef, useState } from "react";
import { initialBoard } from "../../Constants";
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
import { Chessboard } from "../../models/Chessboard";

const Movement = () => {
  const [chessboard, setChessboard] = useState<Chessboard>(initialBoard);
  const [promotedPawn, setPromotedPawn] = useState<Piece>();
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chessboard.calculateMoves();
  }, []);

  function playMove(playedPiece: Piece, destination: Position): boolean {
    // if playing piece doesn't have any moves
    if (playedPiece.legalMoves === undefined) {
      return false;
    }
    // if black's turn and white is trying to move
    if (playedPiece.color === Color.white && chessboard.totalTurns % 2 !== 1) {
      return false;
    }
    // if white's turn and black is trying to move
    if (playedPiece.color === Color.black && chessboard.totalTurns % 2 !== 0) {
      return false;
    }
    let playedMoveIsLegal = false;
    const legalMove = playedPiece.legalMoves?.some(m => m.samePosition(destination));
    if (!legalMove) {
      return false;
    }
    const enPassant = isEnPassant(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.color
    );
    setChessboard((prevBoard) => {
      const clonedBoard = chessboard.clone();
      clonedBoard.totalTurns++;
      playedMoveIsLegal = clonedBoard.playMove(
        enPassant,
        legalMove,
        playedPiece,
        destination
      );
      return clonedBoard;
    });

    // check for promotion
    let promRow = playedPiece.color === Color.white ? 7 : 0;
    if (destination.y === promRow && playedPiece.isPawn) {
      selectRef.current?.classList.remove("hidden");
      setPromotedPawn((prevPromPawn) => {
        const clonedPlayedPiece = playedPiece.clone();
        clonedPlayedPiece.position = destination.clone();
        return clonedPlayedPiece;
      });
    }
    return playedMoveIsLegal;
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
        const piece = chessboard.pieces.find(
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
        legalMove = pawnMove(prevPosition, position, color, chessboard.pieces);
        break;
      case PieceType.knight:
        legalMove = knightMove(
          prevPosition,
          position,
          color,
          chessboard.pieces
        );
        break;
      case PieceType.bishop:
        legalMove = bishopMove(
          prevPosition,
          position,
          color,
          chessboard.pieces
        );
        break;
      case PieceType.rook:
        legalMove = rookMove(prevPosition, position, color, chessboard.pieces);
        break;
      case PieceType.queen:
        legalMove = queenMove(prevPosition, position, color, chessboard.pieces);
        break;
      case PieceType.king:
        legalMove = kingMove(prevPosition, position, color, chessboard.pieces);
    }
    return legalMove;
  }

  function promote(type: PieceType) {
    if (promotedPawn === undefined) {
      return;
    }
    setChessboard((prevBoard) => {
      const clonedBoard = chessboard.clone();
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotedPawn)) {
          results.push(new Piece(piece.position.clone(), type, piece.color));
        } else {
          results.push(piece);
        }
        return results;
      }, [] as Piece[]);
      clonedBoard.calculateMoves();
      return clonedBoard;
    });
    selectRef.current?.classList.add("hidden");
  }

  function promColor() {
    return promotedPawn?.color === Color.white ? "white" : "black";
  }

  return (
    <>
    <p style={{color: "white", fontSize: "24px"}}>{chessboard.totalTurns}</p>
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
      <Board playMove={playMove} pieces={chessboard.pieces} />
    </>
  );
};

export default Movement;

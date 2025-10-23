import { Piece, Position } from "../../models";
import { Pawn } from "../../models/Pawn";
import { Color } from "../../Types";
import { isOccupied, isOccupiedByOpponent } from "./GeneralRules";

export const pawnMove = (
  prevPosition: Position,
  position: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  const startingRow = color === Color.white ? 1 : 6;
  const pawnDirection = color === Color.white ? 1 : -1;

  // regular moves
  if (
    prevPosition.x === position.x &&
    prevPosition.y === startingRow &&
    position.y - prevPosition.y === 2 * pawnDirection
  ) {
    if (
      !isOccupied(position, boardState) &&
      !isOccupied(
        new Position(position.x, position.y - pawnDirection),
        boardState
      )
    ) {
      return true;
    }
  } else if (
    prevPosition.x === position.x &&
    position.y - prevPosition.y === pawnDirection
  ) {
    if (!isOccupied(position, boardState)) {
      return true;
    }
  }
  // captures
  else if (
    prevPosition.x - position.x === 1 &&
    position.y - prevPosition.y === pawnDirection
  ) {
    // upper or bottom left
    if (isOccupiedByOpponent(position, boardState, color)) {
      return true;
    }
  } else if (
    position.x - prevPosition.x === 1 &&
    position.y - prevPosition.y === pawnDirection
  ) {
    // upper or bottom right
    if (isOccupiedByOpponent(position, boardState, color)) {
      return true;
    }
  }
  return false;
};

export const getLegalPawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  const startingRow = pawn.color === Color.white ? 1 : 6;
  const pawnDirection = pawn.color === Color.white ? 1 : -1;
  const normalMove = new Position(
    pawn.position.x,
    pawn.position.y + pawnDirection
  );
  const specialMove = new Position(
    pawn.position.x,
    pawn.position.y + pawnDirection * 2
  );
  const upperLeftCapture = new Position(
    pawn.position.x - 1,
    pawn.position.y + pawnDirection
  );
  const upperRightCapture = new Position(
    pawn.position.x + 1,
    pawn.position.y + pawnDirection
  );
  const leftPosition = new Position(pawn.position.x - 1, pawn.position.y);
  const rightPosition = new Position(pawn.position.x + 1, pawn.position.y);
  if (!isOccupied(normalMove, boardState)) {
    legalMoves.push(normalMove);
    if (
      pawn.position.y === startingRow &&
      !isOccupied(specialMove, boardState)
    ) {
      legalMoves.push(specialMove);
    }
  }
  // captures
  if (isOccupiedByOpponent(upperLeftCapture, boardState, pawn.color)) {
    legalMoves.push(upperLeftCapture);
  } else if (!isOccupied(upperLeftCapture, boardState)) {
    const leftPiece = boardState.find((p) =>
      p.samePosition(leftPosition)
    );
    if (leftPiece && (leftPiece as Pawn).enPassant) {
      legalMoves.push(upperLeftCapture);
    }
  }
  if (isOccupiedByOpponent(upperRightCapture, boardState, pawn.color)) {
    legalMoves.push(upperRightCapture);
  } else if (!isOccupied(upperRightCapture, boardState)) {
    const rightPiece = boardState.find((p) =>
      p.samePosition(rightPosition)
    );
    if (rightPiece && (rightPiece as Pawn).enPassant) {
      legalMoves.push(upperRightCapture);
    }
  }
  return legalMoves;
};

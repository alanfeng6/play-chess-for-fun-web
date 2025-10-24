import { Piece, Position } from "../../models";
import { Color } from "../../Types";
import { bishopMove } from "./BishopRules";
import { isOccupied, isOccupiedByOpponent } from "./GeneralRules";
import { rookMove } from "./RookRules";

export const queenMove = (
  prevPosition: Position,
  position: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  if (
    rookMove(prevPosition, position, color, boardState) ||
    bishopMove(prevPosition, position, color, boardState)
  ) {
    return true;
  }
  return false;
};

export const getLegalQueenMoves = (
  queen: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  // up
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x,
      queen.position.y + i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // right
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x + i,
      queen.position.y,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // down
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x,
      queen.position.y - i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // left
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x - i,
      queen.position.y,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // up right
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x + i,
      queen.position.y + i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // down right
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x + i,
      queen.position.y - i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // down left
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x - i,
      queen.position.y - i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // up left
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      queen.position.x - i,
      queen.position.y + i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, queen.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return legalMoves;
};

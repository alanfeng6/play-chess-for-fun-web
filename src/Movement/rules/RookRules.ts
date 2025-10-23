import { Piece, Position } from "../../models";
import { Color } from "../../Types";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./GeneralRules";

export const rookMove = (
  prevPosition: Position,
  position: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  if (prevPosition.x === position.x) {
    for (let i = 1; i < 8; i++) {
      let multiplier = position.y < prevPosition.y ? -1 : 1;
      let passedSquare = new Position(
        prevPosition.x,
        prevPosition.y + i * multiplier
      );
      if (passedSquare.samePosition(position)) {
        if (isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)) {
          return true;
        }
      } else {
        if (isOccupied(passedSquare, boardState)) {
          break;
        }
      }
    }
  } else if (prevPosition.y === position.y) {
    for (let i = 1; i < 8; i++) {
      let multiplier = position.x < prevPosition.x ? -1 : 1;
      let passedSquare = new Position(
        prevPosition.x + i * multiplier,
        prevPosition.y
      );
      if (passedSquare.samePosition(position)) {
        if (isEmptyOrOccupiedByOpponent(passedSquare, boardState, color)) {
          return true;
        }
      } else {
        if (isOccupied(passedSquare, boardState)) {
          break;
        }
      }
    }
  }
  return false;
};

export const getLegalRookMoves = (
  rook: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  // up
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      rook.position.x,
      rook.position.y + i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, rook.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // right
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      rook.position.x + i,
      rook.position.y,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, rook.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // down
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      rook.position.x,
      rook.position.y - i,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, rook.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // left
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      rook.position.x - i,
      rook.position.y,
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, rook.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return legalMoves;
};

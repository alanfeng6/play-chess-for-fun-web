import { Piece, Position } from "../../models";
import { Color } from "../../Types";
import {
  isEmptyOrOccupiedByOpponent,
  isOccupied,
  isOccupiedByOpponent,
} from "./GeneralRules";

export const bishopMove = (
  prevPosition: Position,
  position: Position,
  color: Color,
  boardState: Piece[]
): boolean => {
  for (let i = 1; i < 8; i++) {
    // up right
    if (position.x > prevPosition.x && position.y > prevPosition.y) {
      let passedSquare = new Position(
        prevPosition.x + i,
        prevPosition.y + i
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
    // down right
    if (position.x > prevPosition.x && position.y < prevPosition.y) {
      let passedSquare = new Position(
        prevPosition.x + i,
        prevPosition.y - i
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
    // down left
    if (position.x < prevPosition.x && position.y < prevPosition.y) {
      let passedSquare = new Position(
        prevPosition.x - i,
        prevPosition.y - i
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
    // up left
    if (position.x < prevPosition.x && position.y > prevPosition.y) {
      let passedSquare = new Position(
        prevPosition.x - i,
        prevPosition.y + i
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

export const getLegalBishopMoves = (
  bishop: Piece,
  boardState: Piece[]
): Position[] => {
  const legalMoves: Position[] = [];
  // up right
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x + i,
      bishop.position.y + i
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, bishop.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // down right
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x + i,
      bishop.position.y - i
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, bishop.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // down left
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x - i,
      bishop.position.y - i
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, bishop.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  // up left
  for (let i = 1; i < 8; i++) {
    const destination = new Position(
      bishop.position.x - i,
      bishop.position.y + i
    );
    if (!isOccupied(destination, boardState)) {
      legalMoves.push(destination);
    } else if (isOccupiedByOpponent(destination, boardState, bishop.color)) {
      legalMoves.push(destination);
      break;
    } else {
      break;
    }
  }
  return legalMoves;
};
